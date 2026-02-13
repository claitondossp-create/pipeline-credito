import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useFilters } from '../contexts/FilterContext'
import {
  calculateTaxaInadimplencia,
  generateRiskHeatmap,
  getTopCriticalSegments,
  calculateAgeDistribution
} from '../utils/calculations'

/**
 * Hook customizado para métricas de risco
 * Usado na Aba 2: Análise de Risco
 */
export const useRiskMetrics = () => {
  const { filters } = useFilters()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Construir query com filtros
      let query = supabase
        .from('application_data')
        .select('*')

      // Aplicar filtros (mesmo lógica do useApplicationData)
      if (filters.year && filters.year !== 'todos') {
        const year = parseInt(filters.year)
        query = query
          .gte('data_registro', `${year}-01-01`)
          .lte('data_registro', `${year}-12-31`)
      }

      if (filters.month && filters.month !== 'todos' && filters.year && filters.year !== 'todos') {
        const year = parseInt(filters.year)
        const month = parseInt(filters.month)
        
        const startDate = `${year}-${String(month).padStart(2, '0')}-01`
        
        // Lidar com virada de ano
        let endYear = year
        let endMonth = month + 1
        
        if (month === 12) {
            endYear = year + 1
            endMonth = 1
        }
        
        const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`

        query = query.gte('data_registro', startDate).lt('data_registro', endDate)
      }

      if (filters.gender && filters.gender !== 'todos') {
        query = query.eq('genero', filters.gender)
      }

      if (filters.contractType && filters.contractType !== 'todos') {
        query = query.eq('tipo_contrato', filters.contractType)
      }

      if (filters.ageRange && filters.ageRange !== 'todos') {
        query = query.eq('faixa_etaria', filters.ageRange)
      }

      const { data: contratos, error: queryError } = await query

      if (queryError) throw queryError

      // Calcular métricas de risco
      const metrics = calculateRiskMetrics(contratos || [])
      setData(metrics)

    } catch (err) {
      console.error('Erro ao buscar métricas de risco:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const calculateRiskMetrics = (contratos) => {
    if (!contratos || contratos.length === 0) {
      return {
        taxaInadimplencia: 0,
        meta: 8, // Meta padrão
        heatmapData: [],
        topSegmentosCriticos: [],
        distribucaoPorIdade: [],
        totalContratos: 0,
        inadimplentes: 0
      }
    }

    // Taxa de inadimplência
    const taxaInadimplencia = calculateTaxaInadimplencia(contratos)

    // Meta de inadimplência (pode vir de configuração futura)
    const meta = 8

    // Heatmap: Escolaridade × Tipo de Renda
    const heatmapData = generateRiskHeatmap(contratos, 'escolaridade', 'tipo_renda')

    // Top 5 segmentos mais críticos
    const topSegmentosCriticos = getTopCriticalSegments(contratos, 5)

    // Distribuição de risco por idade (com taxa de inadimplência)
    const distribucaoPorIdade = calculateAgeDistribution(contratos)

    // Contadores básicos
    const totalContratos = contratos.length
    const inadimplentes = contratos.filter(c => c.alvo_inadimplencia === 1).length

    // Risco por faixa etária (para gráfico)
    const riscoPorIdade = distribucaoPorIdade.map(item => ({
      faixa: item.faixa,
      risco: item.taxaInadimplencia,
      quantidade: item.quantidade
    }))

    return {
      taxaInadimplencia,
      meta,
      heatmapData,
      topSegmentosCriticos,
      distribucaoPorIdade,
      riscoPorIdade,
      totalContratos,
      inadimplentes,
      contratos // Para análises adicionais
    }
  }

  return { data, loading, error, refetch: fetchData }
}

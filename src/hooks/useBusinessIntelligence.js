import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useFilters } from '../contexts/FilterContext'
import {
  calculateCrossSellPotencial,
  calculateChannelEfficiency,
  prepareScatterPlotData
} from '../utils/calculations'

/**
 * Hook customizado para inteligência de negócio
 * Usado na Aba 3: Business Intelligence
 */
export const useBusinessIntelligence = () => {
  const { filters } = useFilters()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Buscar application_data
      let appQuery = supabase
        .from('application_data')
        .select('*')

      // Aplicar filtros
      if (filters.year && filters.year !== 'todos') {
        const year = parseInt(filters.year)
        appQuery = appQuery
          .gte('data_registro', `${year}-01-01`)
          .lte('data_registro', `${year}-12-31`)
      }

      if (filters.month && filters.month !== 'todos') {
        const month = parseInt(filters.month)
        appQuery = appQuery.filter('data_registro', 'gte', `${filters.year}-${String(month).padStart(2, '0')}-01`)
        appQuery = appQuery.filter('data_registro', 'lt', `${filters.year}-${String(month + 1).padStart(2, '0')}-01`)
      }

      if (filters.gender && filters.gender !== 'todos') {
        appQuery = appQuery.eq('genero', filters.gender)
      }

      if (filters.contractType && filters.contractType !== 'todos') {
        appQuery = appQuery.eq('tipo_contrato', filters.contractType)
      }

      if (filters.ageRange && filters.ageRange !== 'todos') {
        appQuery = appQuery.eq('faixa_etaria', filters.ageRange)
      }

      const { data: applicationData, error: appError } = await appQuery
      if (appError) throw appError

      // Buscar previous_application (amostra para cross-sell)
      const { data: previousData, error: prevError } = await supabase
        .from('previous_application')
        .select('*')
        .limit(10000) // Limitar para performance

      if (prevError) throw prevError

      // Calcular métricas
      const metrics = calculateBusinessMetrics(applicationData || [], previousData || [])
      setData(metrics)

    } catch (err) {
      console.error('Erro ao buscar inteligência de negócio:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const calculateBusinessMetrics = (applicationData, previousData) => {
    if (!applicationData || applicationData.length === 0) {
      return {
        crossSell: { qtdPotencial: 0, percentual: 0 },
        rankingCanais: [],
        scatterData: [],
        performanceProduto: []
      }
    }

    // Cross-Sell Potencial
    const crossSell = calculateCrossSellPotencial(applicationData, previousData)

    // Ranking de Canais por Eficiência
    const rankingCanais = calculateChannelEfficiency(applicationData, 'canal_venda')

    // Dados para Scatter Plot (Canal de Venda)
    const scatterData = prepareScatterPlotData(applicationData, 'canal_venda')

    // Performance por Tipo de Produto
    const performanceProduto = prepareScatterPlotData(applicationData, 'tipo_contrato')
      .map(item => ({
        produto: item.name,
        ticketMedio: item.ticketMedio,
        taxaInadimplencia: item.taxaInadimplencia,
        qtdContratos: item.qtdContratos,
        volumeTotal: item.volume,
        score: (item.ticketMedio * (100 - item.taxaInadimplencia)) / 100000 // Score simplificado
      }))
      .sort((a, b) => b.score - a.score)

    return {
      crossSell,
      rankingCanais,
      scatterData,
      performanceProduto,
      totalContratos: applicationData.length
    }
  }

  return { data, loading, error, refetch: fetchData }
}

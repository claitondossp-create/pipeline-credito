import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useFilters } from '../contexts/FilterContext'

/**
 * Hook para buscar dados reais de application_data
 * Compatible com os filtros existentes
 */
export const useApplicationData = () => {
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

      // Filtro de ano (baseado em data_registro)
      if (filters.year && filters.year !== 'todos') {
        const year = parseInt(filters.year)
        query = query
          .gte('data_registro', `${year}-01-01`)
          .lte('data_registro', `${year}-12-31`)
      }

      // Filtro de mês
      if (filters.month && filters.month !== 'todos') {
        const month = parseInt(filters.month)
        // Extrair mês da data usando função SQL
        query = query.filter('data_registro', 'gte', `${filters.year}-${String(month).padStart(2, '0')}-01`)
        query = query.filter('data_registro', 'lt', `${filters.year}-${String(month + 1).padStart(2, '0')}-01`)
      }

      // Filtro de gênero
      if (filters.gender && filters.gender !== 'todos') {
        query = query.eq('genero', filters.gender)
      }

      // Filtro de tipo de contrato
      if (filters.contractType && filters.contractType !== 'todos') {
        query = query.eq('tipo_contrato', filters.contractType)
      }

      // Filtro de faixa etária
      if (filters.ageRange && filters.ageRange !== 'todos') {
        query = query.eq('faixa_etaria', filters.ageRange)
      }

      const { data: contratos, error: queryError } = await query

      if (queryError) throw queryError

      // Calcular métricas
      const metrics = calculateMetrics(contratos || [])
      setData(metrics)

    } catch (err) {
      console.error('Erro ao buscar dados:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const calculateMetrics = (contratos) => {
    if (!contratos || contratos.length === 0) {
      return {
        totalVolume: 0,
        totalContratos: 0,
        ticketMedio: 0,
        taxaInadimplencia: 0,
        taxaEficiencia: 100,
        contratos: [],
        volumePorRenda: [],
        volumePorGenero: {},
        contratosPorMes: [],
        volumePorFaixaEtaria: []
      }
    }

    const totalVolume = contratos.reduce((sum, c) => sum + parseFloat(c.valor_credito || 0), 0)
    const totalContratos = contratos.length
    const ticketMedio = totalContratos > 0 ? totalVolume / totalContratos : 0
    
    // Taxa de inadimplência baseada em alvo_inadimplencia
    const inadimplentes = contratos.filter(c => c.alvo_inadimplencia === 1).length
    const taxaInadimplencia = totalContratos > 0 ? (inadimplentes / totalContratos) * 100 : 0
    
    // Taxa de eficiência (sempre 100% pois esses são créditos concedidos)
    const taxaEficiencia = 100

    // Volume por tipo de renda
    const rendaGroups = contratos.reduce((acc, c) => {
      const tipo = c.tipo_renda || 'Não informado'
      if (!acc[tipo]) acc[tipo] = 0
      acc[tipo] += parseFloat(c.valor_credito || 0)
      return acc
    }, {})
    
    const volumePorRenda = Object.entries(rendaGroups)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)

    // Volume por gênero
    const volumePorGenero = contratos.reduce((acc, c) => {
      const genero = c.genero || 'Não informado'
      acc[genero] = (acc[genero] || 0) + parseFloat(c.valor_credito || 0)
      return acc
    }, {})

    // Volume por faixa etária
    const faixaGroups = contratos.reduce((acc, c) => {
      const faixa = c.faixa_etaria || 'Não informado'
      if (!acc[faixa]) acc[faixa] = { total: 0, count: 0 }
      acc[faixa].total += parseFloat(c.valor_credito || 0)
      acc[faixa].count += 1
      return acc
    }, {})

    const volumePorFaixaEtaria = Object.entries(faixaGroups)
      .map(([label, data]) => ({ 
        label, 
        value: data.total,
        count: data.count,
        percentual: (data.count / totalContratos) * 100
      }))
      .sort((a, b) => b.value - a.value)

    // Contratos por mês
    const contratosPorMes = contratos.reduce((acc, c) => {
      if (!c.data_registro) return acc
      const data = new Date(c.data_registro)
      const mes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`
      if (!acc[mes]) {
        acc[mes] = { mes, volume: 0, quantidade: 0 }
      }
      acc[mes].volume += parseFloat(c.valor_credito || 0)
      acc[mes].quantidade += 1
      return acc
    }, {})

    return {
      totalVolume,
      totalContratos,
      ticketMedio,
      taxaInadimplencia,
      taxaEficiencia,
      contratos,
      volumePorRenda,
      volumePorGenero,
      volumePorFaixaEtaria,
      contratosPorMes: Object.values(contratosPorMes).sort((a, b) => a.mes.localeCompare(b.mes))
    }
  }

  return { data, loading, error, refetch: fetchData }
}

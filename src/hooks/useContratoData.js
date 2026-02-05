import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useFilters } from '../contexts/FilterContext'

export const useContratoData = () => {
  const { filters } = useFilters()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      
      let query = supabase
        .from('contratos_credito')
        .select('*')
      
      // Aplicar filtros
      if (filters.year !== 'todos') {
        query = query.gte('data_contrato', `${filters.year}-01-01`)
                     .lt('data_contrato', `${parseInt(filters.year) + 1}-01-01`)
      }
      
      if (filters.month !== 'todos') {
        const monthStr = filters.month.padStart(2, '0')
        query = query.gte('data_contrato', `${filters.year}-${monthStr}-01`)
                     .lt('data_contrato', `${filters.year}-${monthStr}-31`)
      }
      
      if (filters.gender !== 'todos') {
        query = query.eq('genero', filters.gender)
      }
      
      if (filters.contractType !== 'todos') {
        query = query.eq('tipo_contrato', filters.contractType)
      }
      
      if (filters.ageRange !== 'todos') {
        query = query.eq('faixa_etaria', filters.ageRange)
      }

      const { data: contratos, error: queryError } = await query
      
      if (queryError) throw queryError
      
      // Calcular métricas
      const metrics = calculateMetrics(contratos)
      setData(metrics)
      setError(null)
    } catch (err) {
      console.error('Erro ao buscar dados:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters]) // Recria fetchData quando filters mudar

  useEffect(() => {
    fetchData()
  }, [fetchData]) // Executa quando fetchData mudar

  const calculateMetrics = (contratos) => {
    if (!contratos || contratos.length === 0) {
      return {
        totalVolume: 0,
        totalSolicitado: 0,
        totalContratos: 0,
        ticketMedio: 0,
        taxaInadimplencia: 0,
        taxaEficiencia: 0,
        contratos: []
      }
    }

    const totalSolicitado = contratos.reduce((sum, c) => sum + parseFloat(c.valor_solicitado || 0), 0)
    const totalVolume = contratos.reduce((sum, c) => sum + parseFloat(c.valor_concedido || 0), 0)
    const totalContratos = contratos.length
    const ticketMedio = totalContratos > 0 ? totalVolume / totalContratos : 0
    const inadimplentes = contratos.filter(c => c.inadimplente).length
    const taxaInadimplencia = totalContratos > 0 ? (inadimplentes / totalContratos) * 100 : 0
    const taxaEficiencia = totalSolicitado > 0 ? (totalVolume / totalSolicitado) * 100 : 0
    
    return {
      totalVolume,
      totalSolicitado,
      totalContratos,
      ticketMedio,
      taxaInadimplencia,
      taxaEficiencia,
      contratos
    }
  }

  return { data, loading, error, refetch: fetchData }
}

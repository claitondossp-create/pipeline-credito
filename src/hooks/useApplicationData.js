import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useFilters } from '../contexts/FilterContext'
import {
  calculateVolume,
  calculateTicketMedio,
  countContratos,
  calculateTaxaInadimplencia,
  calculateTaxaEficiencia,
  groupByField,
  convertGroupToArray,
  calculateAgeDistribution,
  calculateTemporalEvolution,
  calculateRecentRegistrationRisk,
  calculateRiscoRelativo
} from '../utils/calculations'

/**
 * Hook para buscar dados reais de application_data
 * Com cálculos avançados traduzidos de DAX
 */
export const useApplicationData = () => {
  const { filters } = useFilters()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [allData, setAllData] = useState([]) // Dados sem filtro para cálculos globais

  // Buscar dados globais (uma vez)
  useEffect(() => {
    const fetchAllData = async () => {
      const { data: all } = await supabase
        .from('application_data')
        .select('*')
      if (all) setAllData(all)
    }
    fetchAllData()
  }, [])

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

      // Calcular métricas usando biblioteca
      const metrics = calculateMetrics(contratos || [], allData)
      setData(metrics)

    } catch (err) {
      console.error('Erro ao buscar dados:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters, allData])

  useEffect(() => {
    if (allData.length > 0) {
      fetchData()
    }
  }, [fetchData, allData])

  const calculateMetrics = (contratos, globalData) => {
    if (!contratos || contratos.length === 0) {
      return {
        totalVolume: 0,
        totalSolicitado: 0,
        totalContratos: 0,
        ticketMedio: 0,
        taxaInadimplencia: 0,
        taxaEficiencia: 0,
        riscoRelativo: 0,
        riscoCadastroRecente: null,
        contratos: [],
        volumePorRenda: [],
        volumePorGenero: {},
        volumePorFaixaEtaria: [],
        contratosPorMes: []
      }
    }

    // Métricas básicas usando biblioteca
    const { totalVolume, totalSolicitado } = calculateVolume(contratos)
    const totalContratos = countContratos(contratos)
    const ticketMedio = calculateTicketMedio(contratos)
    const taxaInadimplencia = calculateTaxaInadimplencia(contratos)
    const taxaEficiencia = calculateTaxaEficiencia(contratos)
    
    // Risco relativo (comparado com dados globais)
    const riscoRelativo = globalData.length > 0 
      ? calculateRiscoRelativo(contratos, globalData)
      : 1

    // Risco de cadastro recente
    const riscoCadastroRecente = calculateRecentRegistrationRisk(contratos)

    // Volume por tipo de renda
    const rendaGrouped = groupByField(contratos, 'tipo_renda')
    const volumePorRenda = convertGroupToArray(rendaGrouped, 'value', true)

    // Volume por gênero
    const generoGrouped = groupByField(contratos, 'genero')
    const volumePorGenero = generoGrouped

    // Distribuição por faixa etária (com ordenação correta)
    const volumePorFaixaEtaria = calculateAgeDistribution(contratos)

    // Evolução temporal
    const contratosPorMes = calculateTemporalEvolution(contratos)

    return {
      totalVolume,
      totalSolicitado,
      totalContratos,
      ticketMedio,
      taxaInadimplencia,
      taxaEficiencia,
      riscoRelativo,
      riscoCadastroRecente,
      contratos,
      volumePorRenda,
      volumePorGenero,
      volumePorFaixaEtaria,
      contratosPorMes
    }
  }

  return { data, loading, error, refetch: fetchData }
}

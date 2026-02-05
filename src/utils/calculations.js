/**
 * Biblioteca de Cálculos - Dashboard de Crédito
 * Tradução de fórmulas DAX do Power BI para JavaScript
 */

/* ============================================
   1. VOLUME E CARTEIRA
   ============================================ */

/**
 * Calcula métricas de volume total da carteira
 * DAX: Total Volume Carteira = SUM(fApplication[AMT_CREDIT])
 */
export const calculateVolume = (data) => {
  const totalVolume = data.reduce((sum, row) => 
    sum + (parseFloat(row.valor_credito) || 0), 0
  )
  
  const totalSolicitado = data.reduce((sum, row) => 
    sum + (parseFloat(row.valor_total_bem) || 0), 0
  )
  
  return { totalVolume, totalSolicitado }
}

/**
 * Calcula ticket médio
 * DAX: Ticket Médio = AVERAGE(fApplication[AMT_CREDIT])
 */
export const calculateTicketMedio = (data) => {
  if (!data || data.length === 0) return 0
  
  const total = data.reduce((sum, row) => 
    sum + (parseFloat(row.valor_credito) || 0), 0
  )
  
  return total / data.length
}

/**
 * Conta quantidade de contratos
 * DAX: Qtd Contratos = COUNTROWS(fApplication)
 */
export const countContratos = (data) => {
  return data ? data.length : 0
}

/* ============================================
   2. RISCO E INADIMPLÊNCIA
   ============================================ */

/**
 * Calcula taxa de inadimplência
 * DAX: Taxa Inadimplência = DIVIDE(
 *   CALCULATE(COUNTROWS(fApplication), fApplication[TARGET] = 1),
 *   COUNTROWS(fApplication), 0
 * )
 */
export const calculateTaxaInadimplencia = (data) => {
  if (!data || data.length === 0) return 0
  
  const inadimplentes = data.filter(r => r.alvo_inadimplencia === 1).length
  return (inadimplentes / data.length) * 100
}

/**
 * Calcula risco relativo comparado à média global
 * DAX: Risco Relativo = DIVIDE([Taxa Inadimplência], CALCULATE([Taxa Inadimplência], ALL(fApplication)))
 */
export const calculateRiscoRelativo = (filteredData, allData) => {
  const taxaFiltrada = calculateTaxaInadimplencia(filteredData)
  const taxaGlobal = calculateTaxaInadimplencia(allData)
  
  if (taxaGlobal === 0) return 0
  
  return taxaFiltrada / taxaGlobal
}

/**
 * Calcula taxa de eficiência (aprovação)
 * Taxa Eficiência = (Valor Concedido / Valor Solicitado) * 100
 */
export const calculateTaxaEficiencia = (data) => {
  if (!data || data.length === 0) return 0
  
  const totalConcedido = data.reduce((sum, r) => sum + (parseFloat(r.valor_credito) || 0), 0)
  const totalSolicitado = data.reduce((sum, r) => sum + (parseFloat(r.valor_total_bem) || 0), 0)
  
  if (totalSolicitado === 0) return 0
  
  return (totalConcedido / totalSolicitado) * 100
}

/* ============================================
   3. CROSS-SELLING
   ============================================ */

/**
 * Identifica clientes com potencial de cross-sell
 * DAX: Cross Sell Potencial = CALCULATE(
 *   COUNTROWS(fApplication),
 *   fApplication[TARGET] = 0,
 *   NOT(ISBLANK(RELATED(fPreviousApplication[SK_ID_PREV]))),
 *   fPreviousApplication[NAME_CONTRACT_STATUS] = "Approved"
 * )
 */
export const calculateCrossSellPotencial = (applicationData, previousData) => {
  // IDs de clientes adimplentes
  const adimplentes = new Set(
    applicationData
      .filter(r => r.alvo_inadimplencia === 0)
      .map(r => r.id_cliente_atual)
  )
  
  // IDs com histórico de aprovação
  const comAprovacao = new Set(
    previousData
      .filter(r => r.status_contrato === 'Approved')
      .map(r => r.id_cliente_atual)
  )
  
  // Intersecção: adimplentes COM histórico aprovado
  const potenciais = [...adimplentes].filter(id => comAprovacao.has(id))
  
  return {
    qtdPotencial: potenciais.length,
    clientesIds: potenciais,
    percentual: (potenciais.length / adimplentes.size) * 100
  }
}

/* ============================================
   4. EFICIÊNCIA DE CANAL
   ============================================ */

/**
 * Calcula score de eficiência por canal
 * DAX: Efic Canal Score = DIVIDE([Ticket Médio] * (1 - [Taxa Inadimplência]), 1000)
 */
export const calculateChannelEfficiency = (data, groupByField = 'canal_venda') => {
  // Agrupar por canal
  const byChannel = data.reduce((acc, row) => {
    const channel = row[groupByField] || 'Não informado'
    
    if (!acc[channel]) {
      acc[channel] = {
        canal: channel,
        contratos: [],
        totalVolume: 0,
        inadimplentes: 0
      }
    }
    
    acc[channel].contratos.push(row)
    acc[channel].totalVolume += parseFloat(row.valor_credito) || 0
    if (row.alvo_inadimplencia === 1) {
      acc[channel].inadimplentes++
    }
    
    return acc
  }, {})
  
  // Calcular score para cada canal
  return Object.values(byChannel).map(channel => {
    const qtdContratos = channel.contratos.length
    const ticketMedio = channel.totalVolume / qtdContratos
    const taxaInadimp = channel.inadimplentes / qtdContratos
    
    // Score de eficiência
    const eficienciaScore = (ticketMedio * (1 - taxaInadimp)) / 1000
    
    return {
      canal: channel.canal,
      score: eficienciaScore,
      ticketMedio,
      taxaInadimplencia: taxaInadimp * 100,
      volume: channel.totalVolume,
      qtdContratos
    }
  }).sort((a, b) => b.score - a.score)
}

/* ============================================
   5. RISCO CADASTRO RECENTE
   ============================================ */

/**
 * Calcula risco para cadastros recentes (< 1 ano)
 * DAX: Risco Cadastro Recente = CALCULATE(
 *   [Taxa Inadimplência],
 *   FILTER(fApplication, fApplication[DAYS_ID_PUBLISH] > -365)
 * )
 */
export const calculateRecentRegistrationRisk = (data) => {
  const umAnoAtras = new Date()
  umAnoAtras.setFullYear(umAnoAtras.getFullYear() - 1)
  
  const cadastrosRecentes = data.filter(r => {
    if (!r.data_registro) return false
    const dataRegistro = new Date(r.data_registro)
    return dataRegistro >= umAnoAtras
  })
  
  if (cadastrosRecentes.length === 0) {
    return { taxa: 0, quantidade: 0, riscoRelativo: 0 }
  }
  
  const taxaCadastroRecente = calculateTaxaInadimplencia(cadastrosRecentes)
  const taxaGlobal = calculateTaxaInadimplencia(data)
  const riscoRelativo = taxaGlobal > 0 ? taxaCadastroRecente / taxaGlobal : 0
  
  return {
    taxa: taxaCadastroRecente,
    quantidade: cadastrosRecentes.length,
    riscoRelativo
  }
}

/* ============================================
   6. AGREGAÇÕES E DISTRIBUIÇÕES
   ============================================ */

/**
 * Agrupa dados por campo e calcula métricas
 */
export const groupByField = (data, field) => {
  return data.reduce((acc, row) => {
    const key = row[field] || 'Não informado'
    
    if (!acc[key]) {
      acc[key] = {
        label: key,
        value: 0,
        count: 0,
        inadimplentes: 0
      }
    }
    
    acc[key].value += parseFloat(row.valor_credito) || 0
    acc[key].count += 1
    if (row.alvo_inadimplencia === 1) {
      acc[key].inadimplentes += 1
    }
    
    return acc
  }, {})
}

/**
 * Converte agrupamento em array ordenado
 */
export const convertGroupToArray = (grouped, sortBy = 'value', descending = true) => {
  const array = Object.values(grouped)
  
  array.sort((a, b) => {
    const diff = descending ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
    return diff
  })
  
  return array
}

/**
 * Calcula distribuição por faixa etária
 */
export const calculateAgeDistribution = (data) => {
  const grouped = groupByField(data, 'faixa_etaria')
  const total = data.length
  
  return Object.entries(grouped).map(([faixa, stats]) => ({
    faixa,
    quantidade: stats.count,
    percentual: (stats.count / total) * 100,
    volume: stats.value,
    taxaInadimplencia: (stats.inadimplentes / stats.count) * 100
  })).sort((a, b) => {
    // Ordem customizada para faixas etárias
    const ordem = ['<25', '25-35', '35-45', '45-60', '>60']
    return ordem.indexOf(a.faixa) - ordem.indexOf(b.faixa)
  })
}

/**
 * Calcula evolução temporal (mês a mês)
 */
export const calculateTemporalEvolution = (data, dateField = 'data_registro') => {
  const byMonth = data.reduce((acc, row) => {
    if (!row[dateField]) return acc
    
    const date = new Date(row[dateField])
    const mesAno = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!acc[mesAno]) {
      acc[mesAno] = {
        mes: mesAno,
        volume: 0,
        quantidade: 0,
        inadimplentes: 0
      }
    }
    
    acc[mesAno].volume += parseFloat(row.valor_credito) || 0
    acc[mesAno].quantidade += 1
    if (row.alvo_inadimplencia === 1) {
      acc[mesAno].inadimplentes += 1
    }
    
    return acc
  }, {})
  
  return Object.values(byMonth)
    .sort((a, b) => a.mes.localeCompare(b.mes))
    .map(m => ({
      ...m,
      taxaInadimplencia: (m.inadimplentes / m.quantidade) * 100,
      ticketMedio: m.volume / m.quantidade
    }))
}

/* ============================================
   7. HEATMAP (MATRIZ DE RISCO)
   ============================================ */

/**
 * Gera dados para heatmap de risco (2 dimensões)
 */
export const generateRiskHeatmap = (data, rowField, colField) => {
  const matrix = {}
  
  data.forEach(row => {
    const rowKey = row[rowField] || 'Não informado'
    const colKey = row[colField] || 'Não informado'
    
    if (!matrix[rowKey]) matrix[rowKey] = {}
    if (!matrix[rowKey][colKey]) {
      matrix[rowKey][colKey] = { total: 0, inadimplentes: 0 }
    }
    
    matrix[rowKey][colKey].total += 1
    if (row.alvo_inadimplencia === 1) {
      matrix[rowKey][colKey].inadimplentes += 1
    }
  })
  
  // Converter para formato de heatmap
  const heatmapData = []
  Object.entries(matrix).forEach(([row, cols]) => {
    Object.entries(cols).forEach(([col, stats]) => {
      heatmapData.push({
        row,
        col,
        value: (stats.inadimplentes / stats.total) * 100,
        total: stats.total
      })
    })
  })
  
  return heatmapData
}

/* ============================================
   8. TOP N SEGMENTOS
   ============================================ */

/**
 * Identifica top N segmentos mais críticos
 */
export const getTopCriticalSegments = (data, n = 5) => {
  // Combinar escolaridade + tipo renda como segmento
  const segments = {}
  
  data.forEach(row => {
    const segment = `${row.escolaridade || 'N/A'} + ${row.tipo_renda || 'N/A'}`
    
    if (!segments[segment]) {
      segments[segment] = {
        categoria: segment,
        qtdContratos: 0,
        volumeExposto: 0,
        inadimplentes: 0
      }
    }
    
    segments[segment].qtdContratos += 1
    segments[segment].volumeExposto += parseFloat(row.valor_credito) || 0
    if (row.alvo_inadimplencia === 1) {
      segments[segment].inadimplentes += 1
    }
  })
  
  // Calcular taxa e ordenar
  return Object.values(segments)
    .map(s => ({
      ...s,
      taxaInadimplencia: (s.inadimplentes / s.qtdContratos) * 100
    }))
    .sort((a, b) => b.taxaInadimplencia - a.taxaInadimplencia)
    .slice(0, n)
}

/* ============================================
   9. SCATTER PLOT DATA
   ============================================ */

/**
 * Prepara dados para scatter plot (Ticket × Inadimplência)
 */
export const prepareScatterPlotData = (data, groupByField) => {
  const grouped = groupByField(data, groupByField)
  
  return Object.values(grouped).map(group => ({
    name: group.label,
    ticketMedio: group.value / group.count,
    taxaInadimplencia: (group.inadimplentes / group.count) * 100,
    qtdContratos: group.count,
    volume: group.value
  }))
}

export default {
  calculateVolume,
  calculateTicketMedio,
  countContratos,
  calculateTaxaInadimplencia,
  calculateRiscoRelativo,
  calculateTaxaEficiencia,
  calculateCrossSellPotencial,
  calculateChannelEfficiency,
  calculateRecentRegistrationRisk,
  groupByField,
  convertGroupToArray,
  calculateAgeDistribution,
  calculateTemporalEvolution,
  generateRiskHeatmap,
  getTopCriticalSegments,
  prepareScatterPlotData
}

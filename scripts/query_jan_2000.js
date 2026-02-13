import { createClient } from '@supabase/supabase-js'

import fs from 'fs'
import path from 'path'

// Get credentials from .env manually (dotenv might not be installed or configured correctly for ES modules without extra config)
const envPath = path.resolve(process.cwd(), '.env')
const envContent = fs.readFileSync(envPath, 'utf-8')
const env = {}
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=')
  if (key && value) {
    env[key.trim()] = value.trim()
  }
})

const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseKey = env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function queryMetrics() {
  const { data, error } = await supabase
    .from('application_data')
    .select('*')
    .gte('data_registro', '2000-01-01')
    .lte('data_registro', '2000-01-31')

  if (error) {
    console.error('Error querying data:', error)
    return
  }

  if (!data || data.length === 0) {
    console.log('No data found for January 2000.')
    return
  }

  // Calculate Metrics
  const totalContratos = data.length
  const volumeTotal = data.reduce((sum, row) => sum + (parseFloat(row.valor_credito) || 0), 0)
  const ticketMedio = volumeTotal / totalContratos
  
  const inadimplentes = data.filter(row => row.alvo_inadimplencia === 1).length
  const taxaInadimplencia = (inadimplentes / totalContratos) * 100

  // Volume Evolution (Strategic) - Group by day for "evolution" chart data points
  // Or simply list the dates and volumes if not too many
  const evolution = data.reduce((acc, row) => {
    const day = row.data_registro
    acc[day] = (acc[day] || 0) + (parseFloat(row.valor_credito) || 0)
    return acc
  }, {})

  // Distribution by Income Type
  const incomeDistribution = data.reduce((acc, row) => {
    const type = row.tipo_renda || 'Unknown' 
    acc[type] = (acc[type] || 0) + (parseFloat(row.valor_credito) || 0)
    return acc
  }, {})

  // Portfolio Composition (Age Range)
  const portfolioComposition = data.reduce((acc, row) => {
    const range = row.faixa_etaria || 'Unknown'
    acc[range] = (acc[range] || 0) + 1
    return acc
  }, {})

  console.log('--- RESULTADOS JANEIRO 2000 ---')
  console.log(`Volume Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(volumeTotal)}`)
  console.log(`Ticket Médio: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ticketMedio)}`)
  console.log(`Total de Contratos: ${totalContratos}`)
  console.log(`Taxa de Inadimplência: ${taxaInadimplencia.toFixed(2)}%`)
  
  console.log('\n--- Evolução do Volume Estratégico (Diário) ---')
  Object.entries(evolution).sort().forEach(([day, vol]) => {
      console.log(`${day}: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vol)}`)
  })

  console.log('\n--- Distribuição de Volume por Renda ---')
  Object.entries(incomeDistribution).forEach(([type, vol]) => {
      console.log(`${type}: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vol)}`)
  })

  console.log('\n--- Composição da Carteira (Faixa Etária) ---')
  Object.entries(portfolioComposition).forEach(([range, count]) => {
      console.log(`${range}: ${count} contratos`)
  })
}

queryMetrics()

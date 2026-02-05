import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

/**
 * Gráfico de Linha para Evolução Temporal
 * Usado na Aba 1 (Visão Geral)
 */
export default function LineChart({ 
  data, 
  xKey = 'mes',
  lines = [
    { key: 'volume', name: 'Volume (R$)', color: '#C9A55C' },
    { key: 'quantidade', name: 'Quantidade', color: '#8B7355' }
  ],
  height = 300
}) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Sem dados para exibir
      </div>
    )
  }

  // Formatar valores para tooltip
  const formatTooltipValue = (value, name) => {
    if (name.includes('Volume') || name.includes('R$')) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0
      }).format(value)
    }
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  // Formatar label do eixo X
  const formatXAxis = (value) => {
    const [year, month] = value.split('-')
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    return `${monthNames[parseInt(month) - 1]}/${year}`
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLine data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
        <XAxis 
          dataKey={xKey}
          stroke="#C9A55C"
          tick={{ fill: '#999', fontSize: 12 }}
          tickFormatter={formatXAxis}
        />
        <YAxis 
          stroke="#C9A55C"
          tick={{ fill: '#999', fontSize: 12 }}
          tickFormatter={(value) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
            if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
            return value
          }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            border: '1px solid #C9A55C',
            borderRadius: '8px',
            color: '#fff'
          }}
          formatter={formatTooltipValue}
        />
        <Legend 
          wrapperStyle={{ color: '#C9A55C', fontSize: 12 }}
        />
        {lines.map((line, index) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.name}
            stroke={line.color}
            strokeWidth={2}
            dot={{ fill: line.color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLine>
    </ResponsiveContainer>
  )
}

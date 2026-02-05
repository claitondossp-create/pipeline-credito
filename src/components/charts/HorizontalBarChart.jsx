import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

/**
 * Gráfico de Barras Horizontal
 * Usado para distribuições e rankings
 */
export default function HorizontalBarChart({ 
  data, 
  xKey = 'value',
  yKey = 'label',
  color = '#C9A55C',
  height = 300,
  maxBars = 10
}) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Sem dados para exibir
      </div>
    )
  }

  // Limitar número de barras
  const chartData = data.slice(0, maxBars)

  // Formatar valores
  const formatValue = (value) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}B`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}k`
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value)
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart 
        data={chartData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
        <XAxis 
          type="number" 
          stroke="#C9A55C"
          tick={{ fill: '#999', fontSize: 12 }}
          tickFormatter={formatValue}
        />
        <YAxis 
          type="category" 
          dataKey={yKey}
          stroke="#C9A55C"
          tick={{ fill: '#999', fontSize: 12 }}
          width={90}
        />
        <Tooltip 
          formatter={formatValue}
          contentStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            border: '1px solid #C9A55C',
            borderRadius: '8px',
            color: '#fff'
          }}
        />
        <Bar 
          dataKey={xKey} 
          fill={color}
          radius={[0, 4, 4, 0]}
        >
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`}
              fill={index === 0 ? '#D4AF37' : color}
              opacity={1 - (index * 0.08)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

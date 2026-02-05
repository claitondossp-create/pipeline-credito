import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

/**
 * Gráfico de Pizza/Donut para Segmentação
 * Usado na Aba 1 (Visão Geral)
 */
export default function PieChart({ 
  data, 
  nameKey = 'label',
  valueKey = 'value',
  colors = ['#C9A55C', '#8B7355', '#D4AF37', '#B8860B', '#DAA520'],
  innerRadius = 60, // 0 = pizza, >0 = donut
  height = 300
}) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Sem dados para exibir
      </div>
    )
  }

  // Preparar dados
  const chartData = data.map(item => ({
    name: item[nameKey] || item.label || 'Não informado',
    value: item[valueKey] || item.value || item.count || 0
  }))

  // Formatar valores para tooltip
  const formatTooltipValue = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value)
  }

  // Calcular percentuais
  const total = chartData.reduce((sum, item) => sum + item.value, 0)
  
  const renderLabel = (entry) => {
    const percent = ((entry.value / total) * 100).toFixed(1)
    return `${percent}%`
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPie>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={100}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]} 
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={formatTooltipValue}
          contentStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            border: '1px solid #C9A55C',
            borderRadius: '8px',
            color: '#fff'
          }}
        />
        <Legend 
          wrapperStyle={{ color: '#999', fontSize: 12 }}
          iconType="circle"
        />
      </RechartsPie>
    </ResponsiveContainer>
  )
}

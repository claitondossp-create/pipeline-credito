import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

/**
 * Velocímetro/Gauge para indicadores de meta
 * Usado na Aba 2 (Análise de Risco)
 */
export default function GaugeChart({ 
  value = 0,
  max = 100,
  meta = 8, // Meta de inadimplência
  title = "Taxa",
  unit = "%",
  height = 250
}) {
  // Zonas de cor
  const getColor = () => {
    if (value <= 5) return '#10B981' // Verde (Saudável)
    if (value <= meta) return '#F59E0B' // Amarelo (Atenção)
    return '#EF4444' // Vermelho (Crítico)
  }

  // Dados para o gauge (semicírculo)
  const data = [
    { value: value, color: getColor() },
    { value: max - value, color: '#1a1a1a' } // Resto vazio
  ]

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Valor central */}
      <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className={`text-4xl font-bold font-serif-authority ${
          value <= 5 ? 'text-green-500' : 
          value <= meta ? 'text-yellow-500' : 
          'text-red-500'
        }`}>
          {value.toFixed(2)}{unit}
        </div>
        <div className="text-sm text-gray-500 mt-1">{title}</div>
      </div>

      {/* Linha de meta */}
      <div className="w-full px-8 mt-4">
        <div className="flex justify-between text-xs text-gray-600">
          <span>0{unit}</span>
          <span className="text-yellow-500">Meta: {meta}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>

      {/* Legenda de zonas */}
      <div className="flex gap-4 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-400">Saudável (0-5%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-gray-400">Atenção (5-{meta}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-gray-400">Crítico ({meta}%+)</span>
        </div>
      </div>
    </div>
  )
}

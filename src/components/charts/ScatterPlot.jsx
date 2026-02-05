import { ScatterChart as RechartsScatter, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'

/**
 * Scatter Plot para análise de rentabilidade
 * Usado na Aba 3 (Inteligência de Negócio)
 */
export default function ScatterPlot({ 
  data = [],
  xKey = 'ticketMedio',
  yKey = 'taxaInadimplencia',
  zKey = 'qtdContratos', // Tamanho da bolha
  nameKey = 'name',
  height = 400,
  xLabel = "Ticket Médio (R$)",
  yLabel = "Taxa Inadimplência (%)",
  meta = 8 // Linha de referência
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
    x: item[xKey] || 0,
    y: item[yKey] || 0,
    z: item[zKey] || 100,
    name: item[nameKey] || item.name || 'Sem nome'
  }))

  // Formatar valores para tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-black bg-opacity-90 border border-brand-bright rounded-lg p-3">
          <p className="text-white font-bold mb-1">{data.name}</p>
          <p className="text-brand-bright text-sm">
            Ticket Médio: {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(data.x)}
          </p>
          <p className="text-yellow-400 text-sm">
            Inadimplência: {data.y.toFixed(2)}%
          </p>
          <p className="text-gray-400 text-sm">
            Contratos: {new Intl.NumberFormat('pt-BR').format(data.z)}
          </p>
        </div>
      )
    }
    return null
  }

  // Cores baseadas na zona
  const getColor = (item) => {
    // Quadrante inferior direito: Alto ticket + Baixo risco = Verde (sweet spot)
    if (item.y < meta && item.x > 500000) return '#10B981'
    // Quadrante superior direito: Alto ticket + Alto risco = Vermelho
    if (item.y >= meta && item.x > 500000) return '#EF4444'
    // Resto: Amarelo
    return '#F59E0B'
  }

  return (
    <div>
      {/* Legenda */}
      <div className="flex gap-4 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-400">Sweet Spot (Alto ticket + Baixo risco)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-gray-400">Zona de Risco (Alto ticket + Alto risco)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-gray-400">Outros</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <RechartsScatter margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
          <XAxis 
            type="number" 
            dataKey="x"
            name={xLabel}
            stroke="#C9A55C"
            tick={{ fill: '#999', fontSize: 12 }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
              if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
              return value
            }}
            label={{ value: xLabel, position: 'insideBottom', offset: -10, fill: '#999' }}
          />
          <YAxis 
            type="number" 
            dataKey="y"
            name={yLabel}
            stroke="#C9A55C"
            tick={{ fill: '#999', fontSize: 12 }}
            label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: '#999' }}
          />
          <ZAxis 
            type="number" 
            dataKey="z" 
            range={[50, 400]}
            name="Quantidade"
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Linha de referência da meta */}
          <ReferenceLine 
            y={meta} 
            stroke="#F59E0B" 
            strokeDasharray="3 3"
            label={{ value: `Meta: ${meta}%`, fill: '#F59E0B', fontSize: 12 }}
          />

          <Scatter 
            data={chartData}
            fill="#C9A55C"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry)} />
            ))}
          </Scatter>
        </RechartsScatter>
      </ResponsiveContainer>
    </div>
  )
}

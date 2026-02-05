/**
 * Heatmap (Matriz de Calor) para análise de risco 2D
 * Usado na Aba 2 (Análise de Risco)
 */
export default function Heatmap({ 
  data = [],
  rowKey = 'row',
  colKey = 'col',
  valueKey = 'value',
  title = "Matriz de Risco"
}) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Sem dados para exibir
      </div>
    )
  }

  // Extrair linhas e colunas únicas
  const rows = [...new Set(data.map(d => d[rowKey]))].sort()
  const cols = [...new Set(data.map(d => d[colKey]))].sort()

  // Criar matriz
  const matrix = {}
  data.forEach(d => {
    if (!matrix[d[rowKey]]) matrix[d[rowKey]] = {}
    matrix[d[rowKey]][d[colKey]] = d[valueKey]
  })

  // Encontrar min/max para escala de cor
  const values = data.map(d => d[valueKey])
  const min = Math.min(...values)
  const max = Math.max(...values)

  // Função de cor baseada no valor
  const getColor = (value) => {
    if (!value && value !== 0) return 'bg-gray-800'
    
    const normalized = (value - min) / (max - min)
    
    if (normalized <= 0.33) return 'bg-green-900 bg-opacity-60' // Baixo risco
    if (normalized <= 0.66) return 'bg-yellow-900 bg-opacity-60' // Médio risco
    return 'bg-red-900 bg-opacity-80' // Alto risco
  }

  const getTextColor = (value) => {
    if (!value && value !== 0) return 'text-gray-600'
    
    const normalized = (value - min) / (max - min)
    return normalized > 0.5 ? 'text-white' : 'text-gray-300'
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-brand-bright mb-2">{title}</h3>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-gray-500">Taxa Inadimplência:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-900 bg-opacity-60" />
            <span className="text-gray-400">Baixo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-900 bg-opacity-60" />
            <span className="text-gray-400">Médio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-900 bg-opacity-80" />
            <span className="text-gray-400">Alto</span>
          </div>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-xs text-left text-gray-500 border border-gray-800">
              Escolaridade / Renda
            </th>
            {cols.map(col => (
              <th 
                key={col} 
                className="p-2 text-xs text-center text-gray-400 border border-gray-800 min-w-[80px]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row}>
              <td className="p-2 text-xs font-medium text-gray-400 border border-gray-800">
                {row}
              </td>
              {cols.map(col => {
                const value = matrix[row]?.[col]
                return (
                  <td 
                    key={`${row}-${col}`}
                    className={`p-3 text-center border border-gray-800 ${getColor(value)} transition-colors hover:opacity-80 cursor-pointer`}
                    title={value ? `${value.toFixed(2)}%` : 'Sem dados'}
                  >
                    <span className={`text-xs font-bold ${getTextColor(value)}`}>
                      {value ? `${value.toFixed(1)}%` : '-'}
                    </span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

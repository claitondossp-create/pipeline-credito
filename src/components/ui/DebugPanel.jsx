import { useFilters } from '../contexts/FilterContext'
import { useContratoData } from '../hooks/useContratoData'

export default function DebugPanel() {
  const { filters } = useFilters()
  const { data, loading, error } = useContratoData()

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 border border-brand-bright p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="text-brand-bright font-bold mb-2">🔍 DEBUG</h3>
      
      <div className="space-y-2 text-white/80">
        <div>
          <strong>Filtros:</strong>
          <pre className="text-[10px] mt-1 text-brand-bright/60">
            {JSON.stringify(filters, null, 2)}
          </pre>
        </div>
        
        <div>
          <strong>Status:</strong> 
          <span className={loading ? "text-yellow-400" : error ? "text-red-400" : "text-green-400"}>
            {loading ? " Carregando..." : error ? ` Erro: ${error}` : " OK"}
          </span>
        </div>
        
        {data && (
          <div>
            <strong>Dados:</strong>
            <pre className="text-[10px] mt-1 text-brand-bright/60">
              {JSON.stringify({
                totalContratos: data.totalContratos,
                totalVolume: data.totalVolume,
                taxaInadimplencia: data.taxaInadimplencia
              }, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

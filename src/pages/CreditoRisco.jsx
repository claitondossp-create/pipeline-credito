import { useOutletContext } from 'react-router-dom'
import { useFilters } from '../contexts/FilterContext'
import { useRiskMetrics } from '../hooks/useRiskMetrics'
import Header from '../components/layout/Header'
import { GaugeChart, Heatmap, HorizontalBarChart } from '../components/charts'

export default function CreditoRisco() {
  const { onMenuClick } = useOutletContext()
  const { filters, updateFilter } = useFilters()
  const { data, loading, error } = useRiskMetrics()

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-12 w-12 text-brand-bright" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-brand-bright text-sm font-bold">Carregando análise de risco...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="glassmorphism rounded-2xl p-8 text-center max-w-md">
          <span className="material-symbols-outlined text-brand-red text-5xl mb-4">error</span>
          <h2 className="font-serif-authority text-xl text-white mb-2">Erro ao Carregar Dados</h2>
          <p className="text-brand-bright/60 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header 
        title="Saúde e Risco" 
        subtitle="Análise de Inadimplência"
        onMenuClick={onMenuClick}
      >
        <div className="flex gap-2 flex-wrap">
          <select 
            value={filters.year}
            onChange={(e) => updateFilter('year', e.target.value)}
            className="bg-brand-dark/30 border border-brand-bright/20 text-[10px] rounded px-3 py-1 text-brand-bright/80 uppercase tracking-widest focus:ring-brand-bright"
          >
            <option value="2023">Ano: 2023</option>
            <option value="2022">Ano: 2022</option>
          </select>
          <select 
            value={filters.ageRange}
            onChange={(e) => updateFilter('ageRange', e.target.value)}
            className="bg-brand-dark/30 border border-brand-bright/20 text-[10px] rounded px-3 py-1 text-brand-bright/80 uppercase tracking-widest focus:ring-brand-bright"
          >
            <option value="todos">Idade: Todas</option>
            <option value="<25"><25 anos</option>
            <option value="25-35">25-35 anos</option>
            <option value="35-45">35-45 anos</option>
            <option value="45-60">45-60 anos</option>
            <option value=">60">>60 anos</option>
          </select>
        </div>
      </Header>

      {/* Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-8 relative z-10 custom-scrollbar">
        
        {/* Top Row: Gauge + Risk Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Gauge de Inadimplência */}
          <div className="lg:col-span-1 glassmorphism p-6 rounded-2xl">
            <div className="mb-4">
              <h4 className="font-serif-authority text-xl text-white mb-1">Indicador Geral</h4>
              <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Taxa de inadimplência vs Meta</p>
            </div>
            
            <GaugeChart 
              value={data.taxaInadimplencia}
              max={15}
              meta={data.meta}
              title="Inadimplência"
              unit="%"
              height={280}
            />

            <div className="mt-6 pt-4 border-t border-brand-bright/10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Total Contratos:</span>
                <span className="text-white font-bold">{new Intl.NumberFormat('pt-BR').format(data.totalContratos)}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-400">Inadimplentes:</span>
                <span className="text-red-400 font-bold">{new Intl.NumberFormat('pt-BR').format(data.inadimplentes)}</span>
              </div>
            </div>
          </div>

          {/* Risk Badges */}
          <div className="lg:col-span-2 glassmorphism p-6 rounded-2xl">
            <div className="mb-6">
              <h4 className="font-serif-authority text-xl text-white mb-1">Indicadores de Risco Relativo</h4>
              <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Status por dimensão de análise</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-900/20 to-transparent border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-400 text-xl">trending_down</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Risco Baixo</p>
                    <p className="text-lg font-bold text-green-400">Superior Assalariado</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Taxa: 2.1% | Volume Seguro</p>
              </div>

              <div className="bg-gradient-to-r from-yellow-900/20 to-transparent border border-yellow-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-yellow-400 text-xl">trending_flat</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Risco Médio</p>
                    <p className="text-lg font-bold text-yellow-400">Médio Autônomo</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Taxa: 6.1% | Monitoramento</p>
              </div>

              <div className="bg-gradient-to-r from-red-900/20 to-transparent border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-red-400 text-xl">trending_up</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Risco Alto</p>
                    <p className="text-lg font-bold text-red-400">Fundamental Empresário</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Taxa: 12.5% | Ação Imediata</p>
              </div>

              <div className="bg-gradient-to-r from-brand-bright/10 to-transparent border border-brand-bright/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-brand-bright/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-brand-bright text-xl">info</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Meta Global</p>
                    <p className="text-lg font-bold text-brand-bright">{data.meta}% Inadimplência</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Objetivo: Abaixo de {data.meta}% em todos segmentos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: Heatmap */}
        <div className="glassmorphism p-6 rounded-2xl">
          <div className="mb-6">
            <h4 className="font-serif-authority text-xl text-white mb-1">Onde está concentrado o risco?</h4>
            <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Matriz de Calor: Escolaridade × Tipo de Renda</p>
          </div>

          <Heatmap 
            data={data.heatmapData || []}
            rowKey="row"
            colKey="col"
            valueKey="value"
            title="Taxa de Inadimplência (%)"
          />
        </div>

        {/* Bottom Row: Top Segments + Age Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          
          {/* Top 5 Segmentos Críticos */}
          <div className="glassmorphism p-6 rounded-2xl">
            <div className="mb-6">
              <h4 className="font-serif-authority text-xl text-white mb-1">Quais segmentos exigem atenção?</h4>
              <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Top 5 Segmentos Mais Críticos</p>
            </div>

            <div className="space-y-3">
              {data.topSegmentosCriticos && data.topSegmentosCriticos.length > 0 ? (
                data.topSegmentosCriticos.map((segment, idx) => (
                  <div 
                    key={idx}
                    className="bg-black/30 border border-brand-bright/10 rounded-lg p-4 hover:border-brand-bright/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-brand-bright/40">#{idx + 1}</span>
                        <span className="text-sm font-bold text-white">{segment.categoria}</span>
                      </div>
                      <span className={`text-lg font-black ${
                        segment.taxaInadimplencia >= 10 ? 'text-red-400' :
                        segment.taxaInadimplencia >= 7 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {segment.taxaInadimplencia.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>Contratos: {new Intl.NumberFormat('pt-BR').format(segment.qtdContratos)}</span>
                      <span>Volume: {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        notation: 'compact',
                        maximumFractionDigits: 1
                      }).format(segment.volumeExposto)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">Sem dados de segmentos críticos</p>
              )}
            </div>
          </div>

          {/* Risco por Idade */}
          <div className="glassmorphism p-6 rounded-2xl">
            <div className="mb-6">
              <h4 className="font-serif-authority text-xl text-white mb-1">Como a idade influencia?</h4>
              <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Taxa de Inadimplência por Faixa Etária</p>
            </div>

            <HorizontalBarChart 
              data={data.riscoPorIdade || []}
              xKey="risco"
              yKey="faixa"
              color="#EF4444"
              height={280}
              maxBars={10}
            />
          </div>
        </div>
      </div>
    </>
  )
}

import { useOutletContext } from 'react-router-dom'
import { useFilters } from '../contexts/FilterContext'
import { useBusinessIntelligence } from '../hooks/useBusinessIntelligence'
import Header from '../components/layout/Header'
import { HorizontalBarChart, ScatterPlot } from '../components/charts'

export default function BusinessIntelligence() {
  const { onMenuClick } = useOutletContext()
  const { filters, updateFilter } = useFilters()
  const { data, loading, error } = useBusinessIntelligence()

  // Formatar moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value || 0)
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-12 w-12 text-brand-bright" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-brand-bright text-sm font-bold">Carregando inteligência de negócio...</p>
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
        title="Inteligência de Negócio" 
        subtitle="Análise Estratégica & Oportunidades"
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
            value={filters.contractType}
            onChange={(e) => updateFilter('contractType', e.target.value)}
            className="bg-brand-dark/30 border border-brand-bright/20 text-[10px] rounded px-3 py-1 text-brand-bright/80 uppercase tracking-widest focus:ring-brand-bright"
          >
            <option value="todos">Tipo: Todos</option>
            <option value="Cash loans">Cash loans</option>
            <option value="Revolving loans">Revolving loans</option>
          </select>
        </div>
      </Header>

      {/* Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-8 relative z-10 custom-scrollbar">
        
        {/* Top Row: Cross-Sell Card */}
        <div className="glassmorphism p-8 rounded-2xl border-2 border-brand-bright/20 bg-gradient-to-br from-brand-bright/5 via-transparent to-transparent">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-400 text-2xl">trending_up</span>
                </div>
                <div>
                  <h4 className="font-serif-authority text-2xl text-white">Oportunidade de Cross-Sell</h4>
                  <p className="text-xs text-brand-bright/60 uppercase tracking-widest">Clientes com potencial de ativação</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-black/30 rounded-lg p-4 border border-brand-bright/10">
                  <p className="text-xs text-gray-400 uppercase mb-1">Clientes Potenciais</p>
                  <p className="text-3xl font-black text-brand-bright">
                    {new Intl.NumberFormat('pt-BR').format(data.crossSell.qtdPotencial)}
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-brand-bright/10">
                  <p className="text-xs text-gray-400 uppercase mb-1">Taxa de Conversão</p>
                  <p className="text-3xl font-black text-green-400">
                    {data.crossSell.percentual.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-brand-bright/10">
                  <p className="text-xs text-gray-400 uppercase mb-1">Status</p>
                  <p className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Adimplentes
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30 rounded-xl p-6 min-w-[200px]">
              <p className="text-xs text-gray-400 uppercase mb-2">Estratégia Recomendada</p>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Campanhas direcionadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Produtos complementares</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Condições especiais</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Row: Ranking de Canais */}
        <div className="glassmorphism p-6 rounded-2xl">
          <div className="mb-6">
            <h4 className="font-serif-authority text-xl text-white mb-1">Quais canais performam melhor?</h4>
            <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Ranking de Eficiência por Canal de Venda</p>
          </div>

          <HorizontalBarChart 
            data={data.rankingCanais || []}
            xKey="score"
            yKey="canal"
            color="#C9A55C"
            height={300}
            maxBars={8}
          />

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.rankingCanais && data.rankingCanais.slice(0, 4).map((canal, idx) => (
              <div key={idx} className="bg-black/30 rounded-lg p-3 border border-brand-bright/10">
                <p className="text-xs text-gray-400 uppercase mb-1">{canal.canal}</p>
                <p className="text-lg font-bold text-white">{formatCurrency(canal.ticketMedio)}</p>
                <p className="text-xs text-gray-500">{canal.qtdContratos} contratos</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Scatter Plot + Tabela */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pb-12">
          
          {/* Scatter Plot - Análise de Rentabilidade */}
          <div className="lg:col-span-3 glassmorphism p-6 rounded-2xl">
            <div className="mb-6">
              <h4 className="font-serif-authority text-xl text-white mb-1">Onde está o sweet spot?</h4>
              <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Matriz Rentabilidade: Ticket Médio × Inadimplência</p>
            </div>

            <ScatterPlot 
              data={data.scatterData || []}
              xKey="ticketMedio"
              yKey="taxaInadimplencia"
              zKey="qtdContratos"
              nameKey="name"
              height={380}
              xLabel="Ticket Médio (R$)"
              yLabel="Taxa Inadimplência (%)"
              meta={8}
            />
          </div>

          {/* Tabela Performance por Produto */}
          <div className="lg:col-span-2 glassmorphism p-6 rounded-2xl">
            <div className="mb-6">
              <h4 className="font-serif-authority text-xl text-white mb-1">Performance por Produto</h4>
              <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Ranking de Score</p>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {data.performanceProduto && data.performanceProduto.length > 0 ? (
                data.performanceProduto.map((prod, idx) => (
                  <div 
                    key={idx}
                    className="bg-black/30 border border-brand-bright/10 rounded-lg p-4 hover:border-brand-bright/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl font-black text-brand-bright/40">#{idx + 1}</span>
                          <span className="text-sm font-bold text-white">{prod.produto}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-gray-500">Ticket Médio</p>
                            <p className="text-white font-bold">{formatCurrency(prod.ticketMedio)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Inadimplência</p>
                            <p className={`font-bold ${
                              prod.taxaInadimplencia < 5 ? 'text-green-400' :
                              prod.taxaInadimplencia < 8 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {prod.taxaInadimplencia.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Score</p>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          idx === 0 ? 'bg-green-500/20 text-green-400' :
                          idx <= 2 ? 'bg-brand-bright/20 text-brand-bright' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {prod.score.toFixed(1)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-600 pt-2 border-t border-gray-800">
                      <span>{new Intl.NumberFormat('pt-BR').format(prod.qtdContratos)} contratos</span>
                      <span>•</span>
                      <span>Volume: {formatCurrency(prod.volumeTotal)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">Sem dados de performance</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

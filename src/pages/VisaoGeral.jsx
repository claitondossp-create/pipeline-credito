import { useOutletContext } from 'react-router-dom'
import { useFilters } from '../contexts/FilterContext'
import { useContratoData } from '../hooks/useContratoData'
import Header from '../components/layout/Header'
import MetricCard from '../components/ui/MetricCard'
import GaugeChart from '../components/ui/GaugeChart'
import ProgressBar from '../components/ui/ProgressBar'
import DebugPanel from '../components/ui/DebugPanel'

export default function VisaoGeral() {
  const { onMenuClick } = useOutletContext()
  const { filters, updateFilter } = useFilters()
  const { data, loading, error } = useContratoData()

  // Função para formatar moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
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
          <p className="text-brand-bright text-sm font-bold">Carregando dados...</p>
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
        title="Panorama Executivo" 
        subtitle="Visão Geral de Crédito"
        onMenuClick={onMenuClick}
      >
        {/* Period Toggle */}
        <div className="flex items-center bg-brand-dark/40 border border-brand-bright/20 rounded-lg p-1">
          <button 
            onClick={() => updateFilter('period', 'mensal')}
            className={`px-4 py-1.5 text-[10px] font-extrabold rounded transition-all ${
              filters.period === 'mensal' 
                ? 'bg-brand-bright text-black' 
                : 'text-brand-bright/70 hover:text-white'
            }`}
          >
            MENSAL
          </button>
          <button 
            onClick={() => updateFilter('period', 'anual')}
            className={`px-4 py-1.5 text-[10px] font-bold transition-all ${
              filters.period === 'anual' 
                ? 'bg-brand-bright text-black rounded' 
                : 'text-brand-bright/70 hover:text-white'
            }`}
          >
            ANUAL
          </button>
        </div>
      </Header>

      {/* Filters */}
      <div className="px-4 md:px-8 py-4 flex flex-wrap gap-4 border-b border-brand-bright/10 bg-black/20">
        <select 
          value={filters.year}
          onChange={(e) => updateFilter('year', e.target.value)}
          className="bg-transparent border-none text-[10px] font-bold text-brand-bright uppercase tracking-widest focus:ring-0 cursor-pointer"
        >
          <option value="2023">Ano: 2023</option>
          <option value="2022">Ano: 2022</option>
        </select>
        <select 
          value={filters.month}
          onChange={(e) => updateFilter('month', e.target.value)}
          className="bg-transparent border-none text-[10px] font-bold text-brand-bright uppercase tracking-widest focus:ring-0 cursor-pointer"
        >
          <option value="todos">Mês: Todos</option>
          <option value="1">Janeiro</option>
          <option value="6">Junho</option>
          <option value="7">Julho</option>
          <option value="8">Agosto</option>
          <option value="9">Setembro</option>
          <option value="10">Outubro</option>
          <option value="12">Dezembro</option>
        </select>
        <select 
          value={filters.gender}
          onChange={(e) => updateFilter('gender', e.target.value)}
          className="bg-transparent border-none text-[10px] font-bold text-brand-bright uppercase tracking-widest focus:ring-0 cursor-pointer"
        >
          <option value="todos">Gênero: Todos</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
        <select 
          value={filters.contractType}
          onChange={(e) => updateFilter('contractType', e.target.value)}
          className="bg-transparent border-none text-[10px] font-bold text-brand-bright uppercase tracking-widest focus:ring-0 cursor-pointer"
        >
          <option value="todos">Tipo Contrato: Todos</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Imobiliário">Imobiliário</option>
          <option value="Veicular">Veicular</option>
          <option value="Empresarial">Empresarial</option>
        </select>
        <select 
          value={filters.ageRange}
          onChange={(e) => updateFilter('ageRange', e.target.value)}
          className="bg-transparent border-none text-[10px] font-bold text-brand-bright uppercase tracking-widest focus:ring-0 cursor-pointer"
        >
          <option value="todos">Faixa Etária: Todas</option>
          <option value="18-30">18-30 anos</option>
          <option value="31-50">31-50 anos</option>
          <option value="50+">50+ anos</option>
        </select>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-8 relative z-10 custom-scrollbar">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <MetricCard
            icon="payments"
            label="Volume Total"
            value={formatCurrency(data.totalVolume)}
            change={`${data.taxaEficiencia.toFixed(1)}%`}
          />
          <MetricCard
            icon="sell"
            label="Ticket Médio"
            value={formatCurrency(data.ticketMedio)}
            change="Médio"
          />
          <MetricCard
            icon="description"
            label="Total de Contratos"
            value={data.totalContratos.toString()}
            change="Contratos"
          />
          <GaugeChart
            label="Inadimplência"
            value={data.taxaInadimplencia}
            max={10}
            status={data.taxaInadimplencia < 5 ? 'OK' : 'ATENÇÃO'}
          />
        </div>

        {/* Main Chart */}
        <div className="glassmorphism p-4 md:p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
            <div>
              <h4 className="font-serif-authority text-xl md:text-2xl text-white mb-2">
                Qual a evolução do nosso volume estratégico?
              </h4>
              <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">
                Evolução do Volume ao Longo do Tempo (Volume vs Count)
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-bright"></div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Volume (R$)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-brand-bright/60"></div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Qtd. Contratos</span>
              </div>
            </div>
          </div>
          <div className="h-64 md:h-80 w-full relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#26A69A" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#26A69A" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0 250 Q 100 220, 200 230 T 400 150 T 600 180 T 800 100 T 1000 120 V 300 H 0 Z" fill="url(#chartGradient)"></path>
              <path d="M0 250 Q 100 220, 200 230 T 400 150 T 600 180 T 800 100 T 1000 120" fill="none" stroke="#26A69A" strokeLinecap="round" strokeWidth="3"></path>
              <path d="M0 280 Q 150 250, 300 260 T 600 200 T 900 180 T 1000 150" fill="none" stroke="#26A69A" strokeDasharray="6,4" strokeOpacity="0.5" strokeWidth="2"></path>
            </svg>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-brand-bright/40 uppercase tracking-widest">
              <span>Jan</span><span>Mar</span><span>Mai</span><span>Jul</span><span>Set</span><span>Nov</span>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          {/* Volume by Income */}
          <div className="glassmorphism p-4 md:p-8 rounded-2xl">
            <div className="mb-8">
              <h4 className="font-serif-authority text-xl text-white mb-2">Como o volume se distribui por renda?</h4>
              <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Volume por Tipo de Renda</p>
            </div>
            <div className="space-y-6">
              {data.volumePorRenda && data.volumePorRenda.length > 0 ? (
                data.volumePorRenda.slice(0, 4).map((item, idx) => {
                  const maxValue = data.volumePorRenda[0]?.value || 1
                  return (
                    <ProgressBar 
                      key={item.label}
                      label={item.label} 
                      value={item.value} 
                      maxValue={maxValue} 
                      displayValue={formatCurrency(item.value)}
                      opacity={1 - (idx * 0.15)}
                    />
                  )
                })
              ) : (
                <p className="text-brand-bright/40 text-sm">Sem dados disponíveis</p>
              )}
            </div>
          </div>

          {/* Portfolio Composition */}
          <div className="glassmorphism p-4 md:p-8 rounded-2xl flex flex-col">
            <div className="mb-8">
              <h4 className="font-serif-authority text-xl text-white mb-2">Quem compõe nossa carteira?</h4>
              <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Distribuição por Faixa Etária</p>
            </div>
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="none" r="40" stroke="#26A69A" strokeDasharray="125 251" strokeDashoffset="0" strokeOpacity="1" strokeWidth="12"></circle>
                  <circle cx="50" cy="50" fill="none" r="40" stroke="#26A69A" strokeDasharray="60 251" strokeDashoffset="-126" strokeOpacity="0.6" strokeWidth="12"></circle>
                  <circle cx="50" cy="50" fill="none" r="40" stroke="#26A69A" strokeDasharray="66 251" strokeDashoffset="-187" strokeOpacity="0.3" strokeWidth="12"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">
                    {data.totalContratos >= 1000 
                      ? `${(data.totalContratos / 1000).toFixed(1)}K` 
                      : data.totalContratos}
                  </span>
                  <span className="text-[9px] font-bold text-brand-bright uppercase tracking-widest">Contratos</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-brand-bright"></div>
                  <span className="text-[10px] font-bold text-white/70 uppercase">18-30 ANOS (50%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-brand-bright/60"></div>
                  <span className="text-[10px] font-bold text-white/70 uppercase">31-50 ANOS (24%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-brand-bright/30"></div>
                  <span className="text-[10px] font-bold text-white/70 uppercase">50+ ANOS (26%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DebugPanel />
    </>
  )
}

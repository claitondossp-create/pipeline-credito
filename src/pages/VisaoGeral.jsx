import { useOutletContext } from 'react-router-dom'
import { useFilters } from '../contexts/FilterContext'
import { useApplicationData } from '../hooks/useApplicationData'
import Header from '../components/layout/Header'
import MetricCard from '../components/ui/MetricCard'
import { LineChart, PieChart, HorizontalBarChart } from '../components/charts'
import { CONTRACT_TYPES, AGE_RANGES, YEARS, MONTHS } from '../utils/constants'

export default function VisaoGeral() {
  const { onMenuClick } = useOutletContext()
  const { filters, updateFilter } = useFilters()
  const { data, loading, error } = useApplicationData()

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
          <option value="todos">Ano: Todos</option>
          {YEARS.map(year => (
            <option key={year} value={year}>Ano: {year}</option>
          ))}
        </select>
        <select 
          value={filters.month}
          onChange={(e) => updateFilter('month', e.target.value)}
          className="bg-transparent border-none text-[10px] font-bold text-brand-bright uppercase tracking-widest focus:ring-0 cursor-pointer"
        >
          <option value="todos">Mês: Todos</option>
          {MONTHS.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
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
          {CONTRACT_TYPES.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        <select 
          value={filters.ageRange}
          onChange={(e) => updateFilter('ageRange', e.target.value)}
          className="bg-transparent border-none text-[10px] font-bold text-brand-bright uppercase tracking-widest focus:ring-0 cursor-pointer"
        >
          <option value="todos">Faixa Etária: Todas</option>
          {AGE_RANGES.map(range => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
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
          <MetricCard
            icon="warning"
            label="Taxa Inadimplência"
            value={`${(data.taxaInadimplencia || 0).toFixed(2)}%`}
            change={data.taxaInadimplencia < 5 ? 'Saudável' : 'Atenção'}
            isNegative={data.taxaInadimplencia >= 8}
          />
        </div>

        {/* Main Chart - Evolução Temporal */}
        <div className="glassmorphism p-4 md:p-8 rounded-2xl">
          <div className="mb-6">
            <h4 className="font-serif-authority text-xl md:text-2xl text-white mb-2">
              Qual a evolução do nosso volume estratégico?
            </h4>
            <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">
              Evolução do Volume ao Longo do Tempo
            </p>
          </div>
          
          <LineChart 
            data={data.contratosPorMes || []}
            xKey="mes"
            lines={[
              { key: 'volume', name: 'Volume (R$)', color: '#C9A55C' },
              { key: 'quantidade', name: 'Quantidade', color: '#8B7355' }
            ]}
            height={320}
          />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          {/* Volume by Income */}
          <div className="glassmorphism p-4 md:p-8 rounded-2xl">
            <div className="mb-6">
              <h4 className="font-serif-authority text-xl text-white mb-2">Como o volume se distribui por renda?</h4>
              <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Volume por Tipo de Renda</p>
            </div>

            <HorizontalBarChart 
              data={data.volumePorRenda || []}
              xKey="value"
              yKey="label"
              color="#C9A55C"
              height={300}
              maxBars={6}
            />
          </div>

          {/* Portfolio Composition */}
          <div className="glassmorphism p-4 md:p-8 rounded-2xl">
            <div className="mb-6">
              <h4 className="font-serif-authority text-xl text-white mb-2">Quem compõe nossa carteira?</h4>
              <p className="text-[11px] font-medium text-brand-bright/60 uppercase tracking-widest">Distribuição por Faixa Etária</p>
            </div>

            <PieChart 
              data={data.volumePorFaixaEtaria || []}
              nameKey="faixa"
              valueKey="quantidade"
              colors={['#C9A55C', '#8B7355', '#D4AF37', '#B8860B', '#DAA520']}
              innerRadius={70}
              height={320}
            />
          </div>
        </div>
      </div>
    </>
  )
}

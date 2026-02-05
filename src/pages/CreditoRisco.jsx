import { useOutletContext } from 'react-router-dom'
import { useFilters } from '../contexts/FilterContext'
import Header from '../components/layout/Header'

export default function CreditoRisco() {
  const { onMenuClick } = useOutletContext()
  const { filters, updateFilter } = useFilters()

  const heatmapData = [
    { escolaridade: 'Ensino Superior', assalariado: 2.1, empresario: 4.5, autonomo: 3.2, pensionista: 1.8 },
    { escolaridade: 'Ensino Médio', assalariado: 5.8, empresario: 8.4, autonomo: 6.1, pensionista: 3.9 },
    { escolaridade: 'Ensino Fundamental', assalariado: 7.2, empresario: 12.5, autonomo: 9.8, pensionista: 5.4 },
  ]

  const criticalSegments = [
    { name: 'Varejo de Moda Masculina', rate: 14.8, critical: true },
    { name: 'Construção Civil Leve', rate: 11.2, critical: true },
    { name: 'Serviços de Logística', rate: 8.9, critical: false },
    { name: 'Alimentação Fora do Lar', rate: 7.4, critical: false },
    { name: 'Educação Infantil Privada', rate: 6.8, critical: false },
  ]

  const getCellColor = (value) => {
    if (value >= 10) return 'bg-brand-red/40 text-brand-red font-black'
    if (value >= 7) return 'bg-brand-red/20 text-brand-red font-bold'
    if (value >= 5) return 'bg-brand-bright/30 text-brand-bright font-bold'
    if (value >= 3) return 'bg-brand-bright/20 text-brand-bright font-bold'
    return 'bg-brand-bright/10 text-brand-bright'
  }

  return (
    <>
      <Header 
        title="Saúde e Risco" 
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
            <option value="todos">NÍVEL DE RISCO: TODOS</option>
            <option value="18-30">BAIXO RISCO (18-30)</option>
            <option value="31-50">MÉDIO RISCO (31-50)</option>
            <option value="50+">ALTO RISCO (50+)</option>
          </select>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="px-2 py-1 bg-brand-red/10 border border-brand-red/30 text-brand-red text-[10px] font-bold rounded">
            CADASTRO RECENTE: 1.35x
          </span>
          <span className="px-2 py-1 bg-brand-bright/10 border border-brand-bright/30 text-brand-bright text-[10px] font-bold rounded">
            PONTUALIDADE: 0.92x
          </span>
        </div>
      </Header>

      <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-6 relative z-10 custom-scrollbar">
        <div className="grid grid-cols-12 gap-6">
          {/* Gauge - Status de Inadimplência */}
          <div className="col-span-12 lg:col-span-4 glassmorphism p-6 rounded-xl flex flex-col items-center justify-center min-h-[350px]">
            <h4 className="font-serif-authority text-xl text-center text-white mb-8">Status de Inadimplência vs Meta</h4>
            <div className="relative w-48 md:w-64 h-24 md:h-32 overflow-hidden mb-4">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 md:w-48 h-18 md:h-24 border-t-8 border-l-8 border-r-8 border-brand-bright rounded-t-full"></div>
            </div>
            <span className="text-5xl md:text-6xl font-black text-white">6.2%</span>
            <p className="text-brand-red text-sm font-bold uppercase tracking-widest mt-2">Zona Crítica: 8.0%</p>
          </div>

          {/* Heatmap Table */}
          <div className="col-span-12 lg:col-span-8 glassmorphism p-6 rounded-xl">
            <h4 className="font-serif-authority text-xl text-white mb-6">Inadimplência por Escolaridade vs Tipo de Renda</h4>
            <div className="overflow-x-auto rounded-lg border border-brand-bright/10">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="bg-brand-dark/40 text-brand-bright/60 uppercase font-bold tracking-widest border-b border-brand-bright/10">
                    <th className="p-4 text-left">Escolaridade / Renda</th>
                    <th className="p-4 text-center">Assalariado</th>
                    <th className="p-4 text-center">Empresário</th>
                    <th className="p-4 text-center">Autônomo</th>
                    <th className="p-4 text-center">Pensionista</th>
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-4 font-bold text-white border-b border-brand-bright/5">{row.escolaridade}</td>
                      <td className={`p-4 text-center border-b border-brand-bright/5 ${getCellColor(row.assalariado)}`}>{row.assalariado}%</td>
                      <td className={`p-4 text-center border-b border-brand-bright/5 ${getCellColor(row.empresario)}`}>{row.empresario}%</td>
                      <td className={`p-4 text-center border-b border-brand-bright/5 ${getCellColor(row.autonomo)}`}>{row.autonomo}%</td>
                      <td className={`p-4 text-center border-b border-brand-bright/5 ${getCellColor(row.pensionista)}`}>{row.pensionista}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top 5 Critical Segments */}
          <div className="col-span-12 lg:col-span-6 glassmorphism p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-serif-authority text-xl text-white">Top 5 Segmentos Mais Críticos</h4>
              <span className="material-symbols-outlined text-brand-red">warning</span>
            </div>
            <div className="space-y-3">
              {criticalSegments.map((segment, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    segment.critical 
                      ? 'bg-brand-red/10 border border-brand-red/30' 
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <span className="text-sm font-bold text-white">{segment.name}</span>
                  <div className="text-right">
                    <span className={`text-lg font-black ${segment.critical ? 'text-brand-red' : 'text-white'}`}>
                      {segment.rate}%
                    </span>
                    <p className={`text-[9px] uppercase font-bold tracking-widest ${
                      segment.critical ? 'text-brand-red/60' : 'text-white/40'
                    }`}>
                      Inadimplência
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age Distribution Bar Chart */}
          <div className="col-span-12 lg:col-span-6 glassmorphism p-6 rounded-xl flex flex-col">
            <h4 className="font-serif-authority text-xl text-white mb-8">Inadimplência por Faixa Etária</h4>
            <div className="flex-1 flex items-end justify-between gap-4 px-4 relative min-h-[200px]">
              <div className="absolute w-full border-t-2 border-dashed border-brand-bright/30 top-1/2 left-0 z-0">
                <span className="absolute right-0 -top-6 text-[10px] font-bold text-brand-bright/40 uppercase tracking-widest">
                  Média do Portfólio
                </span>
              </div>
              {[
                { label: '18-25', height: '40%', color: 'bg-brand-bright/40' },
                { label: '26-35', height: '55%', color: 'bg-brand-bright/60' },
                { label: '36-45', height: '45%', color: 'bg-brand-bright/80' },
                { label: '46-60', height: '75%', color: 'bg-brand-red/60' },
                { label: '60+', height: '85%', color: 'bg-brand-red' },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 z-10">
                  <div 
                    className={`w-full ${bar.color} rounded-t-sm hover:opacity-80 transition-all`}
                    style={{ height: bar.height }}
                  />
                  <span className="text-[10px] font-bold text-white/60">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Indicators */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-brand-bright/10">
          <h5 className="w-full font-serif-authority text-sm text-brand-bright/60 mb-2 uppercase tracking-widest">
            Indicadores Estratégicos de Risco Relativo
          </h5>
          {[
            { icon: 'fiber_new', label: 'Cadastro Recente', value: '1.35x', danger: true },
            { icon: 'home', label: 'Residência Própria', value: '0.62x', danger: false },
            { icon: 'history_edu', label: 'Histórico Judicial', value: '2.14x', danger: true },
            { icon: 'payments', label: 'Renda Comprometida', value: '1.08x', danger: false },
          ].map((indicator, idx) => (
            <div 
              key={idx}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                indicator.danger 
                  ? 'bg-brand-red/10 border border-brand-red/30' 
                  : indicator.value.startsWith('0') 
                    ? 'bg-brand-bright/10 border border-brand-bright/30'
                    : 'bg-white/5 border border-white/10'
              }`}
            >
              <span className={`material-symbols-outlined ${
                indicator.danger ? 'text-brand-red' : indicator.value.startsWith('0') ? 'text-brand-bright' : 'text-white/40'
              }`}>
                {indicator.icon}
              </span>
              <div>
                <p className={`text-[10px] uppercase font-bold tracking-widest ${
                  indicator.danger ? 'text-brand-red/60' : indicator.value.startsWith('0') ? 'text-brand-bright/60' : 'text-white/40'
                }`}>
                  {indicator.label}
                </p>
                <p className={`text-lg font-black ${
                  indicator.danger ? 'text-brand-red' : indicator.value.startsWith('0') ? 'text-brand-bright' : 'text-white'
                }`}>
                  {indicator.value} <span className="text-[10px] font-normal">vs média</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

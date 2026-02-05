import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Header from '../components/layout/Header'

export default function BusinessIntelligence() {
  const { onMenuClick } = useOutletContext()
  const [approvalIncrease, setApprovalIncrease] = useState(15)

  const channelEfficiency = [
    { name: 'Marketing Direto', efficiency: 84, color: 'bg-brand-bright' },
    { name: 'Parcerias Bancárias', efficiency: 62, color: 'bg-brand-bright/80' },
    { name: 'Indicação Orgânica', efficiency: 45, color: 'bg-brand-bright/60' },
    { name: 'Redes Sociais', efficiency: 28, color: 'bg-brand-red/60' },
  ]

  const contractPerformance = [
    { type: 'Imobiliário Full', subtype: 'Contratos Anuais', volume: 'R$ 450k', health: 92, ltv: 'R$ 12.400', status: 'Saudável' },
    { type: 'Cível Estratégico', subtype: 'Fee + Success', volume: 'R$ 820k', health: 74, ltv: 'R$ 28.900', status: 'Atenção' },
    { type: 'Consultivo Trabalhista', subtype: 'Retainers', volume: 'R$ 1.1M', health: 42, ltv: 'R$ 8.200', status: 'Crítico' },
  ]

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Saudável': return 'bg-brand-bright/10 border-brand-bright/30 text-brand-bright'
      case 'Atenção': return 'bg-brand-bright/10 border-brand-bright/30 text-brand-bright'
      case 'Crítico': return 'bg-rose-500/10 border-rose-500/30 text-rose-400'
      default: return ''
    }
  }

  const getHealthColor = (health) => {
    if (health >= 80) return 'bg-brand-bright'
    if (health >= 60) return 'bg-brand-bright/60'
    return 'bg-rose-500/50'
  }

  // Calculate impact based on slider
  const newContracts = Math.round(84 * (approvalIncrease / 15))
  const revenueIncrease = Math.round(215 * (approvalIncrease / 15))

  return (
    <>
      <Header 
        title="Inteligência de Negócio" 
        subtitle="Análise Estratégica & Credit Score"
        onMenuClick={onMenuClick}
      >
        <div className="flex items-center gap-3 bg-brand-dark/10 p-1.5 rounded-xl border border-brand-bright/10">
          <select className="bg-black/40 border-none text-[10px] rounded-lg pl-4 pr-10 py-2.5 font-bold text-brand-bright uppercase tracking-widest focus:ring-0">
            <option>Canal: TODOS</option>
            <option>Canal: PARCEIROS</option>
            <option>Canal: DIRETO</option>
            <option>Canal: INDICAÇÃO</option>
          </select>
          <div className="h-6 w-px bg-brand-bright/20"></div>
          <button className="flex items-center gap-2 bg-brand-bright/10 text-brand-bright px-5 py-2.5 rounded-lg text-[10px] font-bold hover:bg-brand-bright hover:text-black transition-all uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">filter_alt</span>
            Filtros Globais
          </button>
        </div>
      </Header>

      <div className="flex-1 p-4 md:p-10 overflow-y-auto space-y-8 relative z-10 custom-scrollbar">
        {/* Cross-Sell Banner */}
        <div className="glassmorphism p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 bg-gradient-to-r from-brand-deep/60 to-transparent">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-bright/20 flex items-center justify-center text-brand-bright border border-brand-bright/40 shadow-[0_0_20px_rgba(38,166,154,0.2)]">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-serif-authority text-2xl md:text-3xl font-bold text-white mb-2">
                Potencial de Ativação (Cross-Sell)
              </h3>
              <p className="text-brand-bright/80 text-sm">
                Identificamos <span className="text-brand-bright font-bold">124 clientes</span> com alta propensão para novos produtos jurídicos.
              </p>
              <p className="text-brand-bright/60 text-xs mt-1">
                Otimize sua base ativa através de análise preditiva.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center md:text-right">
              <p className="text-[10px] font-bold text-brand-bright/60 uppercase tracking-widest">Impacto Estimado</p>
              <p className="text-3xl md:text-4xl font-black text-white">R$ 1.2M</p>
            </div>
            <button className="flex items-center gap-2 bg-brand-bright text-black px-6 py-4 rounded-xl font-bold hover:bg-brand-bright/90 transition-all">
              Ver Lista de Leads
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Channel Efficiency & Sweet Spot Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Channel Efficiency */}
          <div className="glassmorphism p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-serif-authority text-xl text-white">Qual canal de venda é mais eficiente?</h4>
              <span className="material-symbols-outlined text-brand-bright/40">insights</span>
            </div>
            <p className="text-[10px] font-bold text-brand-bright/40 uppercase tracking-[0.2em] mb-8">
              Ranking de Conversão vs. CAC
            </p>
            <div className="space-y-6">
              {channelEfficiency.map((channel, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white uppercase tracking-tight">{channel.name}</span>
                    <span className="text-brand-bright font-bold">{channel.efficiency}% Eficiência</span>
                  </div>
                  <div className="w-full h-2 bg-brand-dark/30 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      <div className={`${channel.color} transition-all`} style={{ width: `${channel.efficiency}%` }} />
                      <div className="bg-brand-red/30 flex-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sweet Spot Matrix */}
          <div className="glassmorphism p-6 md:p-8 rounded-2xl">
            <h4 className="font-serif-authority text-xl text-white mb-2">Onde reside o nosso Sweet Spot?</h4>
            <p className="text-[10px] font-bold text-brand-bright/40 uppercase tracking-[0.2em] mb-6">
              Matriz: Ticket Médio vs Inadimplência
            </p>
            <div className="h-56 w-full relative border-l border-b border-brand-bright/20 mt-4">
              <div className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-widest text-brand-bright bg-brand-bright/10 px-2 py-1 rounded">
                Alta Rentabilidade
              </div>
              <div className="absolute bottom-2 left-2 text-[9px] font-bold uppercase tracking-widest text-rose-400 bg-rose-400/10 px-2 py-1 rounded">
                Risco Crítico
              </div>
              {/* Data points */}
              <div className="absolute top-[20%] right-[30%] w-4 h-4 rounded-full bg-brand-bright shadow-[0_0_15px_rgba(38,166,154,0.6)] animate-pulse" />
              <div className="absolute top-[40%] right-[15%] w-3 h-3 rounded-full bg-brand-bright opacity-80" />
              <div className="absolute bottom-[30%] left-[20%] w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
              <div className="absolute top-[10%] right-[10%] w-5 h-5 rounded-full bg-brand-bright shadow-lg border border-white/20" />
              <div className="absolute top-[60%] left-[40%] w-3 h-3 rounded-full bg-brand-bright/40" />
              {/* Axis labels */}
              <div className="absolute -left-12 top-1/2 -rotate-90 text-[8px] font-bold uppercase tracking-widest text-brand-bright/40">
                Ticket Médio
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest text-brand-bright/40">
                Inadimplência (%)
              </div>
            </div>
            <div className="mt-10 flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-bright" />
                <span className="text-[9px] text-white/60 font-bold uppercase tracking-widest">Zona Segura</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[9px] text-white/60 font-bold uppercase tracking-widest">Zona de Risco</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Table & Simulator */}
        <div className="grid grid-cols-12 gap-8">
          {/* Performance Table */}
          <div className="col-span-12 lg:col-span-8 glassmorphism rounded-2xl overflow-hidden">
            <div className="p-6 md:p-8 border-b border-brand-bright/10 bg-brand-dark/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h4 className="font-serif-authority text-xl text-white">Performance Detalhada por Tipo de Contrato</h4>
                <p className="text-[10px] font-bold text-brand-bright/40 uppercase tracking-[0.2em] mt-1">
                  Monitoramento de saúde da carteira
                </p>
              </div>
              <button className="text-brand-bright hover:underline text-[10px] font-bold uppercase tracking-widest">
                Relatório Completo
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-brand-dark/30 text-[9px] uppercase font-black text-brand-bright/60 tracking-[0.2em]">
                    <th className="px-6 md:px-8 py-5">Tipo de Contrato</th>
                    <th className="px-6 md:px-8 py-5">Volume</th>
                    <th className="px-6 md:px-8 py-5">Health Score</th>
                    <th className="px-6 md:px-8 py-5">LTV Médio</th>
                    <th className="px-6 md:px-8 py-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-bright/5">
                  {contractPerformance.map((contract, idx) => (
                    <tr key={idx} className="hover:bg-brand-bright/5 transition-colors">
                      <td className="px-6 md:px-8 py-5">
                        <p className="text-sm font-bold text-white uppercase tracking-tight">{contract.type}</p>
                        <p className="text-[10px] text-brand-bright/60 font-medium">{contract.subtype}</p>
                      </td>
                      <td className="px-6 md:px-8 py-5 text-sm font-black text-white">{contract.volume}</td>
                      <td className="px-6 md:px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-20 md:w-24 h-1.5 bg-brand-dark/30 rounded-full overflow-hidden">
                            <div className={`h-full ${getHealthColor(contract.health)}`} style={{ width: `${contract.health}%` }} />
                          </div>
                          <span className={`text-[11px] font-bold ${contract.health >= 60 ? 'text-brand-bright' : 'text-rose-400'}`}>
                            {contract.health}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 md:px-8 py-5 text-sm font-medium text-white/80 tracking-tighter">{contract.ltv}</td>
                      <td className="px-6 md:px-8 py-5">
                        <span className={`px-3 py-1 border text-[9px] font-black rounded-full uppercase tracking-widest ${getStatusStyle(contract.status)}`}>
                          {contract.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Expansion Simulator */}
          <div className="col-span-12 lg:col-span-4 glassmorphism p-6 md:p-8 rounded-2xl flex flex-col bg-brand-deep/20 border-brand-bright/30">
            <div className="mb-8">
              <h4 className="font-serif-authority text-xl text-white">Simulador de Expansão</h4>
              <p className="text-[10px] font-bold text-brand-bright/40 uppercase tracking-[0.2em] mt-2">
                Impacto na Aprovação de Crédito
              </p>
            </div>
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-white uppercase tracking-widest">Aumento na Aprovação</label>
                  <span className="text-2xl font-black text-brand-bright">+{approvalIncrease}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={approvalIncrease}
                  onChange={(e) => setApprovalIncrease(parseInt(e.target.value))}
                  className="w-full h-2 bg-brand-dark/50 rounded-lg appearance-none cursor-pointer accent-brand-bright"
                />
                <div className="flex justify-between text-[10px] font-bold text-brand-bright/40 uppercase tracking-widest">
                  <span>0% (Conservador)</span>
                  <span>50% (Agressivo)</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-black/40 p-5 rounded-xl border border-brand-bright/10">
                  <p className="text-[10px] font-bold text-brand-bright/40 uppercase tracking-[0.2em] mb-1">
                    Impacto em Novos Contratos
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white">+{newContracts}</span>
                    <span className="text-[11px] font-bold text-brand-bright mb-1">UNID.</span>
                  </div>
                </div>
                <div className="bg-black/40 p-5 rounded-xl border border-brand-bright/10">
                  <p className="text-[10px] font-bold text-brand-bright/40 uppercase tracking-[0.2em] mb-1">
                    Aumento de Receita Mensal
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white">R$ {revenueIncrease}k</span>
                    <span className="material-symbols-outlined text-brand-bright text-lg mb-1">trending_up</span>
                  </div>
                </div>
              </div>
              <button className="w-full border border-brand-bright/40 text-brand-bright font-bold py-4 rounded-xl hover:bg-brand-bright hover:text-black transition-all text-xs uppercase tracking-[0.2em]">
                Aplicar Estratégia
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  { id: 'visao_geral', label: 'Visão Geral', icon: 'dashboard', path: '/dashboard/visao-geral' },
  { id: 'credito_risco', label: 'Crédito & Risco', icon: 'analytics', path: '/dashboard/credito-risco' },
  { id: 'bi', label: 'Business Intelligence', icon: 'query_stats', path: '/dashboard/business-intelligence' },
  { id: 'transacoes', label: 'Transações', icon: 'receipt_long', path: '/dashboard/transacoes' },
  { id: 'alertas', label: 'Alertas', icon: 'notifications', path: '/dashboard/alertas' },
  { id: 'relatorios', label: 'Relatórios', icon: 'description', path: '/dashboard/relatorios' },
]

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-black/50 backdrop-blur-xl border-r border-brand-bright/10 
        flex flex-col transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-8 flex items-center gap-3">
          <div className="bg-brand-dark/50 p-2 rounded-lg border border-brand-bright/20">
            <span className="material-symbols-outlined text-brand-bright text-2xl">chess_king</span>
          </div>
          <div>
            <h1 className="font-serif-authority font-bold text-xl leading-none tracking-tight text-white">Rama</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-bright font-bold">Advogados</p>
          </div>
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="ml-auto lg:hidden text-gray-400 hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all group
                ${isActive(item.path) 
                  ? 'bg-brand-bright/10 border border-brand-bright/30' 
                  : 'hover:bg-brand-dark/30 border border-transparent'
                }
              `}
            >
              <span className={`material-symbols-outlined ${isActive(item.path) ? 'text-brand-bright' : 'text-gray-500 group-hover:text-brand-bright'}`}>
                {item.icon}
              </span>
              <span className={`text-sm ${isActive(item.path) ? 'font-bold text-white' : 'font-medium text-gray-400 group-hover:text-white'}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="p-6 mt-auto border-t border-brand-bright/10">
          <div className="flex items-center gap-3 p-3 glassmorphism rounded-xl">
            <div className="w-10 h-10 rounded-full border border-brand-bright/30 p-0.5 shrink-0 bg-brand-dark flex items-center justify-center">
              <span className="material-symbols-outlined text-brand-bright">analytics</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold truncate text-white uppercase tracking-tight">
                Dashboard Público
              </p>
              <p className="text-[9px] text-brand-bright font-bold uppercase tracking-wider">
                Análise de Crédito
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

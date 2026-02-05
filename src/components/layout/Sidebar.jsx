import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const menuItems = [
  { id: 'visao_geral', label: 'Visão Geral', icon: 'dashboard', path: '/dashboard' },
  { id: 'credito_risco', label: 'Crédito & Risco', icon: 'analytics', path: '/dashboard/credito-risco' },
  { id: 'financeiro', label: 'Financeiro', icon: 'account_balance_wallet', path: '/dashboard/financeiro' },
  { id: 'juridico', label: 'Jurídico', icon: 'gavel', path: '/dashboard/juridico' },
  { id: 'bi', label: 'Business Intelligence', icon: 'query_stats', path: '/dashboard/bi' },
]

const configItems = [
  { id: 'parametros', label: 'Parâmetros', icon: 'settings', path: '/dashboard/parametros', adminOnly: true },
  { id: 'usuarios', label: 'Usuários', icon: 'group', path: '/dashboard/usuarios', adminOnly: true },
  { id: 'perfis', label: 'Perfis', icon: 'admin_panel_settings', path: '/dashboard/perfis', adminOnly: true },
]

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const { profile, hasPermission, signOut } = useAuth()

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

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
          {menuItems.map((item) => {
            const canView = hasPermission(item.id)
            if (!canView && item.id !== 'visao_geral') return null

            return (
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
            )
          })}

          {/* Config Section - Admin Only */}
          {profile?.perfil_tipo === 'admin' && (
            <>
              <div className="pt-6 pb-2 px-4">
                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">Configurações</p>
              </div>
              {configItems.map((item) => (
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
            </>
          )}
        </nav>

        {/* User Profile */}
        <div className="p-6 mt-auto border-t border-brand-bright/10">
          <div className="flex items-center gap-3 p-3 glassmorphism rounded-xl">
            <div className="w-10 h-10 rounded-full border border-brand-bright/30 p-0.5 shrink-0 bg-brand-dark flex items-center justify-center">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.nome} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-brand-bright">person</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold truncate text-white uppercase tracking-tight">
                {profile?.nome || 'Usuário'}
              </p>
              <p className="text-[9px] text-brand-bright font-bold uppercase tracking-wider">
                {profile?.cargo || 'Cargo'}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-gray-500 hover:text-brand-red transition-colors"
              title="Sair"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

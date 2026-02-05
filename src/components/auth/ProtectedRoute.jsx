import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, requiredPermission }) {
  const { user, loading, hasPermission } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-12 w-12 text-brand-bright" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-brand-bright text-sm font-bold uppercase tracking-widest">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glassmorphism rounded-2xl p-8 text-center max-w-md">
          <span className="material-symbols-outlined text-brand-red text-5xl mb-4">lock</span>
          <h2 className="font-serif-authority text-xl text-white mb-2">Acesso Restrito</h2>
          <p className="text-brand-bright/60 text-sm mb-6">
            Você não tem permissão para acessar esta página. 
            Entre em contato com o administrador do sistema.
          </p>
          <button 
            onClick={() => window.history.back()}
            className="bg-brand-bright text-black px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-brand-bright/90 transition-all"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  return children
}

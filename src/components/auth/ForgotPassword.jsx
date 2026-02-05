import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (err) {
      setError('Erro ao enviar email de recuperação. Verifique o endereço informado.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 chess-grid pointer-events-none opacity-20"></div>
        <div className="w-full max-w-md glassmorphism rounded-2xl p-8 relative z-10 text-center">
          <div className="w-16 h-16 bg-brand-bright/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-brand-bright text-3xl">mail</span>
          </div>
          <h2 className="font-serif-authority text-xl text-white mb-4">Email Enviado!</h2>
          <p className="text-gray-400 mb-6">
            Enviamos um link de recuperação para <span className="text-brand-bright">{email}</span>. 
            Verifique sua caixa de entrada e spam.
          </p>
          <Link 
            to="/login"
            className="inline-block bg-brand-bright text-black font-bold px-6 py-3 rounded-lg hover:bg-brand-bright/90 transition-all uppercase tracking-widest text-sm"
          >
            Voltar ao Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 chess-grid pointer-events-none opacity-20"></div>
      
      <div className="w-full max-w-md glassmorphism rounded-2xl p-8 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-brand-dark/50 p-3 rounded-xl border border-brand-bright/20">
            <span className="material-symbols-outlined text-brand-bright text-3xl">chess_king</span>
          </div>
          <div>
            <h1 className="font-serif-authority font-bold text-2xl leading-none tracking-tight text-white">Rama</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-bright font-bold">Advogados</p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="font-serif-authority text-xl text-white mb-2">Recuperar Senha</h2>
          <p className="text-brand-bright/60 text-sm">Informe seu email para receber o link de recuperação</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-brand-red/10 border border-brand-red/30 rounded-lg">
            <p className="text-brand-red text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-brand-bright/60 uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/40 border border-brand-bright/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-bright focus:ring-1 focus:ring-brand-bright transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-bright text-black font-bold py-3 rounded-lg hover:bg-brand-bright/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </span>
            ) : (
              'Enviar Link'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <Link to="/login" className="text-brand-bright hover:underline text-sm inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  )
}

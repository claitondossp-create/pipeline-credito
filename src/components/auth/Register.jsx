import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
    cargo: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validations
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      await signUp(formData.email, formData.password, {
        nome: formData.nome,
        cargo: formData.cargo,
      })
      setSuccess(true)
    } catch (err) {
      if (err.message.includes('already registered')) {
        setError('Este email já está cadastrado')
      } else {
        setError('Erro ao criar conta. Tente novamente.')
      }
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
            <span className="material-symbols-outlined text-brand-bright text-3xl">check_circle</span>
          </div>
          <h2 className="font-serif-authority text-xl text-white mb-4">Cadastro Realizado!</h2>
          <p className="text-gray-400 mb-6">
            Enviamos um email de confirmação para <span className="text-brand-bright">{formData.email}</span>. 
            Por favor, verifique sua caixa de entrada.
          </p>
          <Link 
            to="/login"
            className="inline-block bg-brand-bright text-black font-bold px-6 py-3 rounded-lg hover:bg-brand-bright/90 transition-all uppercase tracking-widest text-sm"
          >
            Ir para Login
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
          <h2 className="font-serif-authority text-xl text-white mb-2">Criar Conta</h2>
          <p className="text-brand-bright/60 text-sm">Preencha os dados para se cadastrar</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-brand-red/10 border border-brand-red/30 rounded-lg">
            <p className="text-brand-red text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-brand-bright/60 uppercase tracking-widest mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-brand-bright/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-bright focus:ring-1 focus:ring-brand-bright transition-all"
              placeholder="João da Silva"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-brand-bright/60 uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-brand-bright/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-bright focus:ring-1 focus:ring-brand-bright transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-brand-bright/60 uppercase tracking-widest mb-2">
              Cargo
            </label>
            <select
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-brand-bright/20 rounded-lg px-4 py-3 text-white focus:border-brand-bright focus:ring-1 focus:ring-brand-bright transition-all"
            >
              <option value="">Selecione seu cargo</option>
              <option value="Sócio">Sócio</option>
              <option value="Advogado Sênior">Advogado Sênior</option>
              <option value="Advogado Pleno">Advogado Pleno</option>
              <option value="Advogado Júnior">Advogado Júnior</option>
              <option value="Analista">Analista</option>
              <option value="Estagiário">Estagiário</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-brand-bright/60 uppercase tracking-widest mb-2">
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-brand-bright/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-bright focus:ring-1 focus:ring-brand-bright transition-all"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-brand-bright/60 uppercase tracking-widest mb-2">
              Confirmar Senha
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-brand-bright/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-bright focus:ring-1 focus:ring-brand-bright transition-all"
              placeholder="Repita a senha"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-bright text-black font-bold py-3 rounded-lg hover:bg-brand-bright/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm mt-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Cadastrando...
              </span>
            ) : (
              'Criar Conta'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-brand-bright/10"></div>
          <span className="text-[10px] text-brand-bright/40 uppercase tracking-widest">ou</span>
          <div className="flex-1 h-px bg-brand-bright/10"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-brand-bright font-semibold hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from '../components/layout/Header'

export default function GerenciarUsuarios() {
  const { onMenuClick } = useOutletContext()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const perfilOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'socio', label: 'Sócio' },
    { value: 'analista', label: 'Analista' },
    { value: 'visualizador', label: 'Visualizador' },
  ]

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUser = async (userId, updates) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)

      if (error) throw error
      
      fetchUsers()
      setShowModal(false)
      setEditingUser(null)
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const getPerfilBadgeColor = (perfil) => {
    switch (perfil) {
      case 'admin': return 'bg-brand-bright/20 text-brand-bright border-brand-bright/30'
      case 'socio': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'analista': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <>
      <Header 
        title="Gerenciar Usuários" 
        subtitle="Administração de Contas"
        onMenuClick={onMenuClick}
      >
        <button 
          onClick={() => { setEditingUser({}); setShowModal(true) }}
          className="flex items-center gap-2 bg-brand-bright text-black px-4 py-2 rounded-lg text-[10px] font-bold hover:bg-brand-bright/90 transition-all uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-sm">person_add</span>
          Novo Usuário
        </button>
      </Header>

      <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10 custom-scrollbar">
        <div className="glassmorphism rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin h-8 w-8 text-brand-bright" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-brand-dark/30 text-[9px] uppercase font-black text-brand-bright/60 tracking-[0.2em]">
                    <th className="px-6 py-4">Usuário</th>
                    <th className="px-6 py-4">Cargo</th>
                    <th className="px-6 py-4">Perfil</th>
                    <th className="px-6 py-4">Cadastro</th>
                    <th className="px-6 py-4">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-bright/5">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-brand-bright/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-bright/30 flex items-center justify-center">
                            {user.avatar_url ? (
                              <img src={user.avatar_url} alt={user.nome} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-brand-bright">person</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{user.nome || 'Sem nome'}</p>
                            <p className="text-[10px] text-brand-bright/60">{user.id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/80">{user.cargo || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full border ${getPerfilBadgeColor(user.perfil_tipo)}`}>
                          {user.perfil_tipo || 'visualizador'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => { setEditingUser(user); setShowModal(true) }}
                          className="text-brand-bright hover:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {users.length === 0 && !loading && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-brand-bright/20 mb-4">group_off</span>
              <p className="text-gray-500">Nenhum usuário cadastrado</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glassmorphism rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif-authority text-xl text-white">
                {editingUser.id ? 'Editar Usuário' : 'Novo Usuário'}
              </h3>
              <button onClick={() => { setShowModal(false); setEditingUser(null) }} className="text-gray-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleUpdateUser(editingUser.id, {
                nome: formData.get('nome'),
                cargo: formData.get('cargo'),
                perfil_tipo: formData.get('perfil_tipo'),
              })
            }} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-brand-bright/60 uppercase tracking-widest mb-2">Nome</label>
                <input
                  name="nome"
                  defaultValue={editingUser.nome}
                  className="w-full bg-black/40 border border-brand-bright/20 rounded-lg px-4 py-3 text-white focus:border-brand-bright transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-bright/60 uppercase tracking-widest mb-2">Cargo</label>
                <input
                  name="cargo"
                  defaultValue={editingUser.cargo}
                  className="w-full bg-black/40 border border-brand-bright/20 rounded-lg px-4 py-3 text-white focus:border-brand-bright transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-bright/60 uppercase tracking-widest mb-2">Perfil de Acesso</label>
                <select
                  name="perfil_tipo"
                  defaultValue={editingUser.perfil_tipo || 'visualizador'}
                  className="w-full bg-black/40 border border-brand-bright/20 rounded-lg px-4 py-3 text-white focus:border-brand-bright transition-all"
                >
                  {perfilOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingUser(null) }}
                  className="flex-1 border border-brand-bright/30 text-brand-bright py-3 rounded-lg hover:bg-brand-bright/10 transition-all font-bold uppercase tracking-widest text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-bright text-black py-3 rounded-lg hover:bg-brand-bright/90 transition-all font-bold uppercase tracking-widest text-sm"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

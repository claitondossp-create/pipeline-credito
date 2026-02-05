import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from '../components/layout/Header'

const defaultVisualizacoes = [
  { id: 1, nome: 'visao_geral', descricao: 'Visão Geral - Panorama Executivo' },
  { id: 2, nome: 'credito_risco', descricao: 'Crédito & Risco - Análise de Saúde' },
  { id: 3, nome: 'financeiro', descricao: 'Financeiro - Controle Financeiro' },
  { id: 4, nome: 'juridico', descricao: 'Jurídico - Gestão de Processos' },
  { id: 5, nome: 'bi', descricao: 'Business Intelligence - Análise Estratégica' },
]

const defaultPerfis = [
  { tipo: 'admin', nome: 'Administrador', descricao: 'Acesso total ao sistema' },
  { tipo: 'socio', nome: 'Sócio', descricao: 'Acesso a todas as visualizações' },
  { tipo: 'analista', nome: 'Analista', descricao: 'Acesso a análises e relatórios' },
  { tipo: 'visualizador', nome: 'Visualizador', descricao: 'Apenas visualização básica' },
]

export default function GerenciarPerfis() {
  const { onMenuClick } = useOutletContext()
  const [permissoes, setPermissoes] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPermissoes()
  }, [])

  const fetchPermissoes = async () => {
    try {
      const { data, error } = await supabase
        .from('perfil_visualizacoes')
        .select('*')

      if (error) throw error

      // Convert to object format
      const permsMap = {}
      defaultPerfis.forEach(perfil => {
        permsMap[perfil.tipo] = []
      })
      
      data?.forEach(perm => {
        if (permsMap[perm.perfil_tipo]) {
          permsMap[perm.perfil_tipo].push(perm.visualizacao_id)
        }
      })

      setPermissoes(permsMap)
    } catch (error) {
      console.error('Error fetching permissions:', error)
      // Set defaults if table doesn't exist yet
      const defaultPerms = {
        admin: [1, 2, 3, 4, 5],
        socio: [1, 2, 3, 4, 5],
        analista: [1, 2, 3],
        visualizador: [1],
      }
      setPermissoes(defaultPerms)
    } finally {
      setLoading(false)
    }
  }

  const togglePermission = (perfilTipo, visualizacaoId) => {
    setPermissoes(prev => {
      const current = prev[perfilTipo] || []
      const updated = current.includes(visualizacaoId)
        ? current.filter(id => id !== visualizacaoId)
        : [...current, visualizacaoId]
      return { ...prev, [perfilTipo]: updated }
    })
  }

  const savePermissoes = async () => {
    setSaving(true)
    try {
      // Delete all existing permissions
      await supabase.from('perfil_visualizacoes').delete().neq('perfil_tipo', '')

      // Insert new permissions
      const inserts = []
      Object.entries(permissoes).forEach(([perfilTipo, vizIds]) => {
        vizIds.forEach(vizId => {
          inserts.push({ perfil_tipo: perfilTipo, visualizacao_id: vizId })
        })
      })

      if (inserts.length > 0) {
        const { error } = await supabase.from('perfil_visualizacoes').insert(inserts)
        if (error) throw error
      }

      alert('Permissões salvas com sucesso!')
    } catch (error) {
      console.error('Error saving permissions:', error)
      alert('Erro ao salvar permissões')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Header 
        title="Perfis e Permissões" 
        subtitle="Controle de Acesso por Perfil"
        onMenuClick={onMenuClick}
      >
        <button 
          onClick={savePermissoes}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-bright text-black px-4 py-2 rounded-lg text-[10px] font-bold hover:bg-brand-bright/90 transition-all uppercase tracking-widest disabled:opacity-50"
        >
          {saving ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Salvando...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">save</span>
              Salvar Alterações
            </>
          )}
        </button>
      </Header>

      <div className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10 custom-scrollbar space-y-8">
        {/* Perfis Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {defaultPerfis.map(perfil => (
            <div key={perfil.tipo} className="glassmorphism p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-brand-bright">
                  {perfil.tipo === 'admin' ? 'admin_panel_settings' : 
                   perfil.tipo === 'socio' ? 'supervisor_account' :
                   perfil.tipo === 'analista' ? 'analytics' : 'visibility'}
                </span>
                <h4 className="font-bold text-white">{perfil.nome}</h4>
              </div>
              <p className="text-sm text-brand-bright/60">{perfil.descricao}</p>
              <p className="text-[10px] text-brand-bright mt-3 font-bold">
                {(permissoes[perfil.tipo] || []).length} visualizações ativas
              </p>
            </div>
          ))}
        </div>

        {/* Permissions Matrix */}
        <div className="glassmorphism rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-brand-bright/10 bg-brand-dark/10">
            <h3 className="font-serif-authority text-xl text-white">Matriz de Permissões</h3>
            <p className="text-[10px] font-bold text-brand-bright/40 uppercase tracking-[0.2em] mt-1">
              Configure as visualizações disponíveis para cada perfil
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin h-8 w-8 text-brand-bright" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-brand-dark/30 text-[9px] uppercase font-black text-brand-bright/60 tracking-[0.2em]">
                    <th className="px-6 py-4 text-left">Visualização</th>
                    {defaultPerfis.map(perfil => (
                      <th key={perfil.tipo} className="px-6 py-4 text-center">{perfil.nome}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-bright/5">
                  {defaultVisualizacoes.map(viz => (
                    <tr key={viz.id} className="hover:bg-brand-bright/5 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-white">{viz.descricao}</p>
                        <p className="text-[10px] text-brand-bright/40 uppercase tracking-widest">{viz.nome}</p>
                      </td>
                      {defaultPerfis.map(perfil => (
                        <td key={perfil.tipo} className="px-6 py-4 text-center">
                          {perfil.tipo === 'admin' ? (
                            <span className="material-symbols-outlined text-brand-bright">check_circle</span>
                          ) : (
                            <button
                              onClick={() => togglePermission(perfil.tipo, viz.id)}
                              className={`w-6 h-6 rounded-md border-2 transition-all ${
                                (permissoes[perfil.tipo] || []).includes(viz.id)
                                  ? 'bg-brand-bright border-brand-bright'
                                  : 'border-brand-bright/30 hover:border-brand-bright'
                              }`}
                            >
                              {(permissoes[perfil.tipo] || []).includes(viz.id) && (
                                <span className="material-symbols-outlined text-black text-sm">check</span>
                              )}
                            </button>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="glassmorphism p-6 rounded-xl flex items-start gap-4">
          <span className="material-symbols-outlined text-brand-bright text-2xl shrink-0">info</span>
          <div>
            <h4 className="font-bold text-white mb-2">Sobre os Perfis de Acesso</h4>
            <ul className="text-sm text-brand-bright/60 space-y-1">
              <li><strong className="text-brand-bright">Administrador:</strong> Acesso total, incluindo gerenciamento de usuários e perfis.</li>
              <li><strong className="text-brand-bright">Sócio:</strong> Acesso a todas as visualizações de dados e relatórios.</li>
              <li><strong className="text-brand-bright">Analista:</strong> Acesso a análises e dados operacionais.</li>
              <li><strong className="text-brand-bright">Visualizador:</strong> Acesso apenas à visão geral básica.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

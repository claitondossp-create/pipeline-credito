import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchProfile(session.user.id)
        await fetchPermissions(session.user.id)
      }
      
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
          await fetchPermissions(session.user.id)
        } else {
          setProfile(null)
          setPermissions([])
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!error && data) {
      setProfile(data)
    }
  }

  const fetchPermissions = async (userId) => {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('perfil_tipo')
      .eq('id', userId)
      .single()

    if (profileData) {
      const { data: perms } = await supabase
        .from('perfil_visualizacoes')
        .select('visualizacao_id, visualizacoes(nome)')
        .eq('perfil_tipo', profileData.perfil_tipo)

      if (perms) {
        setPermissions(perms.map(p => p.visualizacoes.nome))
      }
    }
  }

  const signUp = async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    // Create profile after signup
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          nome: userData.nome,
          cargo: userData.cargo || 'Analista',
          perfil_tipo: 'visualizador', // Default profile type
          avatar_url: null,
        })

      if (profileError) throw profileError
    }

    return data
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    setProfile(null)
    setPermissions([])
  }

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error
    return data
  }

  const updatePassword = async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error
    return data
  }

  const updateProfile = async (updates) => {
    if (!user) throw new Error('No user logged in')

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error
    setProfile(data)
    return data
  }

  const hasPermission = (viewName) => {
    if (profile?.perfil_tipo === 'admin') return true
    return permissions.includes(viewName)
  }

  const value = {
    user,
    profile,
    permissions,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    hasPermission,
    fetchProfile,
    fetchPermissions,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

// Auth Components
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgotPassword from './components/auth/ForgotPassword'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Layout
import DashboardLayout from './components/layout/DashboardLayout'

// Pages
import VisaoGeral from './pages/VisaoGeral'
import CreditoRisco from './pages/CreditoRisco'
import BusinessIntelligence from './pages/BusinessIntelligence'
import GerenciarUsuarios from './pages/GerenciarUsuarios'
import GerenciarPerfis from './pages/GerenciarPerfis'

// Placeholder pages for other routes
function PlaceholderPage({ title }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="glassmorphism rounded-2xl p-12 text-center">
        <span className="material-symbols-outlined text-brand-bright text-6xl mb-4">construction</span>
        <h2 className="font-serif-authority text-2xl text-white mb-2">{title}</h2>
        <p className="text-brand-bright/60">Esta página está em desenvolvimento</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<VisaoGeral />} />
            <Route 
              path="credito-risco" 
              element={
                <ProtectedRoute requiredPermission="credito_risco">
                  <CreditoRisco />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="financeiro" 
              element={
                <ProtectedRoute requiredPermission="financeiro">
                  <PlaceholderPage title="Financeiro" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="juridico" 
              element={
                <ProtectedRoute requiredPermission="juridico">
                  <PlaceholderPage title="Jurídico" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="bi" 
              element={
                <ProtectedRoute requiredPermission="bi">
                  <BusinessIntelligence />
                </ProtectedRoute>
              } 
            />
            <Route path="parametros" element={<PlaceholderPage title="Parâmetros" />} />
            <Route path="usuarios" element={<GerenciarUsuarios />} />
            <Route path="perfis" element={<GerenciarPerfis />} />
          </Route>

          {/* Redirect root to dashboard or login */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* 404 - Redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

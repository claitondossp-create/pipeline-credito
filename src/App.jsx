import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FilterProvider } from "./contexts/FilterContext";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

// Pages
import VisaoGeral from "./pages/VisaoGeral";
import CreditoRisco from "./pages/CreditoRisco";
import BusinessIntelligence from "./pages/BusinessIntelligence";

// Placeholder pages for other routes
function PlaceholderPage({ title }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="glassmorphism rounded-2xl p-12 text-center">
        <span className="material-symbols-outlined text-brand-bright text-6xl mb-4">
          construction
        </span>
        <h2 className="font-serif-authority text-2xl text-white mb-2">
          {title}
        </h2>
        <p className="text-brand-bright/60">
          Esta página está em desenvolvimento
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to dashboard */}
          <Route
            path="/"
            element={<Navigate to="/dashboard/visao-geral" replace />}
          />

          {/* Dashboard Routes - Sem autenticação */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route
              index
              element={<Navigate to="/dashboard/visao-geral" replace />}
            />
            <Route path="visao-geral" element={<VisaoGeral />} />
            <Route path="credito-risco" element={<CreditoRisco />} />
            <Route
              path="business-intelligence"
              element={<BusinessIntelligence />}
            />
            <Route
              path="transacoes"
              element={<PlaceholderPage title="Transações" />}
            />
            <Route
              path="alertas"
              element={<PlaceholderPage title="Alertas" />}
            />
            <Route
              path="relatorios"
              element={<PlaceholderPage title="Relatórios" />}
            />
            <Route
              path="configuracoes"
              element={<PlaceholderPage title="Configurações" />}
            />
          </Route>

          {/* Redirect old auth routes to dashboard */}
          <Route
            path="/login"
            element={<Navigate to="/dashboard/visao-geral" replace />}
          />
          <Route
            path="/register"
            element={<Navigate to="/dashboard/visao-geral" replace />}
          />
          <Route
            path="/forgot-password"
            element={<Navigate to="/dashboard/visao-geral" replace />}
          />

          {/* Catch all - redirect to dashboard */}
          <Route
            path="*"
            element={<Navigate to="/dashboard/visao-geral" replace />}
          />
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  );
}

export default App;

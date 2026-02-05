import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex text-white selection:bg-brand-bright/30">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background Grid */}
        <div className="absolute inset-0 chess-grid pointer-events-none opacity-20"></div>
        
        {/* Page Content */}
        <Outlet context={{ onMenuClick: () => setSidebarOpen(true) }} />
      </main>
    </div>
  )
}

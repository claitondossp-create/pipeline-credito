import { useState } from 'react'

export default function Header({ title, subtitle, onMenuClick, children }) {
  return (
    <header className="h-auto min-h-[80px] border-b border-brand-bright/10 bg-black/40 backdrop-blur-md px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between z-10 shrink-0 gap-4">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-brand-bright hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-brand-bright text-3xl hidden md:block">chess_king</span>
          <div>
            <h2 className="font-serif-authority text-lg md:text-2xl font-bold text-white tracking-widest uppercase">
              {title}
            </h2>
            {subtitle && (
              <p className="text-brand-bright/60 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Header Actions */}
      <div className="flex items-center gap-4 flex-wrap">
        {children}
      </div>
    </header>
  )
}

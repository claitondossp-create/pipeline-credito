import { useState, useEffect, useRef } from 'react'

export default function YearSlider({ selectedYear, onChange, minYear = 2010, maxYear = 2023 }) {
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef(null)
  
  // Gerar array de anos
  const years = []
  for (let i = minYear; i <= maxYear; i++) {
    years.push(i)
  }

  const handleClick = (e) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    const percentage = Math.max(0, Math.min(1, x / width))
    
    const index = Math.round(percentage * (years.length - 1))
    const year = years[index]
    onChange(year.toString())
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    handleClick(e)
  }

  // Calcular posição da "bolinha"
  const getPosition = () => {
    if (selectedYear === 'todos') return -1 // Estado especial?
    const yearInt = parseInt(selectedYear)
    const index = years.indexOf(yearInt)
    if (index === -1) return 100 // Se não achar (ou for 'todos' tratado diferente), joga pro fim ou inicio
    return (index / (years.length - 1)) * 100
  }

  const position = getPosition()

  return (
    <div className="flex flex-col gap-2 min-w-[300px] w-full max-w-2xl">
      <div className="flex justify-between items-center mb-1">
        <label className="text-[10px] font-bold text-brand-bright uppercase tracking-widest">
          Linha do Tempo
        </label>
        <button 
          onClick={() => onChange('todos')}
          className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded transition-colors border ${
            selectedYear === 'todos' 
              ? 'bg-brand-bright text-black border-brand-bright' 
              : 'text-brand-bright/50 border-transparent hover:border-brand-bright/20'
          }`}
        >
          Ver Todos
        </button>
      </div>

      <div 
        className="relative h-8 flex items-center cursor-pointer group"
        ref={trackRef}
        onClick={handleClick}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Trilho Fundo */}
        <div className="absolute w-full h-1 bg-brand-dark/50 rounded-full overflow-hidden border border-brand-bright/10">
          {/* Preenchimento até o ano selecionado (opcional, ou apenas indicar o slider) */}
          {selectedYear !== 'todos' && (
            <div 
              className="h-full bg-brand-bright/20" 
              style={{ width: `${position}%` }} 
            />
          )}
        </div>

        {/* Marcas de ano (Notches) - Mostrar apenas alguns para não poluir */}
        <div className="absolute w-full flex justify-between px-0.5 pointer-events-none">
          {years.map((year, idx) => {
            // Mostrar ano a cada 5 anos ou extremos
            const showLabel = idx === 0 || idx === years.length - 1 || year % 5 === 0
            return (
              <div key={year} className="flex flex-col items-center gap-1">
                <div className={`w-0.5 h-1.5 ${showLabel ? 'bg-brand-bright/40' : 'bg-brand-bright/10'}`} />
                {showLabel && (
                  <span className="text-[9px] text-brand-bright/40 font-mono -ml-[50%]">
                    {year}
                  </span>
                )}
              </div>
            )
          })}
        </div>
        
        {/* A Bolinha (Thumb) */}
        {selectedYear !== 'todos' && (
          <div 
            className="absolute h-4 w-4 bg-brand-bright rounded-full shadow-[0_0_10px_rgba(201,165,92,0.5)] transform -translate-x-1/2 transition-transform duration-75 flex items-center justify-center z-10"
            style={{ left: `${position}%` }}
          >
            <div className="absolute -top-7 bg-brand-bright text-black text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {selectedYear}
            </div>
          </div>
        )}
      </div>

      {/* Display do Ano Selecionado (Feedback visual claro) */}
      <div className="text-right">
       <span className="text-xs text-brand-bright font-mono">
         {selectedYear === 'todos' ? 'PERÍODO COMPLETO' : selectedYear}
       </span>
      </div>
    </div>
  )
}

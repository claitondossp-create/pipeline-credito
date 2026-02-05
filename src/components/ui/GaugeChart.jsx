export default function GaugeChart({ value, max, label, status }) {
  const percentage = (value / max) * 100
  const strokeDasharray = `${percentage}, 100`
  
  return (
    <div className="glassmorphism teal-glow p-6 rounded-xl flex items-center justify-between">
      <div>
        <p className="text-[10px] font-bold text-brand-bright/60 uppercase tracking-[0.2em]">{label}</p>
        <h3 className="text-2xl font-extrabold text-white mt-1 tracking-tight">{value}%</h3>
        <p className="text-[9px] font-bold text-rose-400 mt-1 uppercase">Meta Máx: {max}%</p>
      </div>
      <div className="relative w-16 h-16">
        <svg className="w-full h-full gauge-svg" viewBox="0 0 36 36">
          <circle 
            cx="18" 
            cy="18" 
            r="16" 
            fill="none" 
            stroke="rgba(38,166,154,0.1)" 
            strokeWidth="3"
          />
          <circle 
            cx="18" 
            cy="18" 
            r="16" 
            fill="none" 
            stroke={percentage > 80 ? '#E53935' : '#26A69A'}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round" 
            strokeWidth="3"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-brand-bright">
          {status || 'OK'}
        </span>
      </div>
    </div>
  )
}

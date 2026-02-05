export default function MetricCard({ 
  icon, 
  label, 
  value, 
  change, 
  changeType = 'positive',
  children 
}) {
  return (
    <div className="glassmorphism teal-glow p-6 rounded-xl relative overflow-hidden group hover:border-brand-bright/40 transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className="material-symbols-outlined text-brand-bright opacity-40">{icon}</span>
        {change && (
          <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
            changeType === 'positive' 
              ? 'text-brand-bright bg-brand-bright/10' 
              : 'text-brand-red bg-brand-red/10'
          }`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-[10px] font-bold text-brand-bright/60 uppercase tracking-[0.2em]">{label}</p>
      <h3 className="text-2xl font-extrabold text-white mt-1 tracking-tight">{value}</h3>
      {children}
    </div>
  )
}

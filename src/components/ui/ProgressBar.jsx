export default function ProgressBar({ label, value, maxValue, displayValue, opacity = 1 }) {
  const percentage = (value / maxValue) * 100
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
        <span className="text-white/80">{label}</span>
        <span className="text-brand-bright">{displayValue}</span>
      </div>
      <div className="w-full h-2.5 bg-brand-dark/30 rounded-full overflow-hidden border border-brand-bright/10">
        <div 
          className="h-full bg-brand-bright transition-all duration-500"
          style={{ width: `${percentage}%`, opacity }}
        />
      </div>
    </div>
  )
}

import { cn } from '@/lib/utils'

interface EraTagProps {
  era: string
  year?: string
  className?: string
}

export default function EraTag({ era, year, className }: EraTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-display tracking-wider',
        'bg-vintage-brown/90 text-vintage-gold',
        'clip-tag',
        className
      )}
    >
      <span className="w-1 h-1 rounded-full bg-vintage-gold/60" />
      {era}
      {year && <span className="text-vintage-gold/60 ml-0.5">{year}</span>}
    </span>
  )
}

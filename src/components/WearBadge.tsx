import { cn } from '@/lib/utils'
import { wearLevelLabels } from '@/data/mock'
import type { WearLevel } from '@/types'

interface WearBadgeProps {
  level: WearLevel
  showLabel?: boolean
  className?: string
}

const wearColors: Record<WearLevel, string> = {
  1: 'bg-emerald-600',
  2: 'bg-emerald-500',
  3: 'bg-amber-500',
  4: 'bg-orange-500',
  5: 'bg-red-600'
}

export default function WearBadge({ level, showLabel = true, className }: WearBadgeProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-1.5 h-3 rounded-[1px] transition-colors',
              i < level ? wearColors[level] : 'bg-vintage-border/50'
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-[10px] text-vintage-muted font-medium">
          {wearLevelLabels[level]}
        </span>
      )}
    </div>
  )
}

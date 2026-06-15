import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Category, WearLevel } from '@/types'
import { categoryLabels } from '@/data/mock'

interface FilterBarProps {
  selectedCategory: Category | null
  selectedEra: string | null
  selectedWear: WearLevel | null
  onCategoryChange: (c: Category | null) => void
  onEraChange: (e: string | null) => void
  onWearChange: (w: WearLevel | null) => void
}

const eras = ['1940s', '1950s', '1960s', '1970s', '1980s']

export default function FilterBar({
  selectedCategory,
  selectedEra,
  selectedWear,
  onCategoryChange,
  onEraChange,
  onWearChange
}: FilterBarProps) {
  const [expanded, setExpanded] = useState(false)
  const hasFilter = selectedCategory || selectedEra || selectedWear

  const clearAll = () => {
    onCategoryChange(null)
    onEraChange(null)
    onWearChange(null)
  }

  return (
    <div className="sticky top-14 z-40 bg-vintage-cream/95 backdrop-blur-sm border-b border-vintage-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-10">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs text-vintage-brown hover:text-vintage-crimson transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            筛选
            {hasFilter && (
              <span className="w-1.5 h-1.5 rounded-full bg-vintage-crimson" />
            )}
          </button>

          {hasFilter && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-[10px] text-vintage-muted hover:text-vintage-crimson transition-colors"
            >
              <X className="w-3 h-3" />
              清除筛选
            </button>
          )}
        </div>

        {expanded && (
          <div className="pb-3 space-y-2.5 animate-slideDown">
            <div className="space-y-1">
              <span className="text-[10px] text-vintage-muted uppercase tracking-wider">年代</span>
              <div className="flex flex-wrap gap-1.5">
                {eras.map((era) => (
                  <button
                    key={era}
                    onClick={() => onEraChange(selectedEra === era ? null : era)}
                    className={cn(
                      'px-2.5 py-1 text-[11px] rounded-sm border transition-all',
                      selectedEra === era
                        ? 'bg-vintage-brown text-vintage-cream border-vintage-brown'
                        : 'border-vintage-border text-vintage-brown hover:border-vintage-brown/50'
                    )}
                  >
                    {era}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-vintage-muted uppercase tracking-wider">品类</span>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() =>
                      onCategoryChange(selectedCategory === key ? null : (key as Category))
                    }
                    className={cn(
                      'px-2.5 py-1 text-[11px] rounded-sm border transition-all',
                      selectedCategory === key
                        ? 'bg-vintage-brown text-vintage-cream border-vintage-brown'
                        : 'border-vintage-border text-vintage-brown hover:border-vintage-brown/50'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-vintage-muted uppercase tracking-wider">磨损等级</span>
              <div className="flex flex-wrap gap-1.5">
                {([1, 2, 3, 4, 5] as WearLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => onWearChange(selectedWear === level ? null : level)}
                    className={cn(
                      'px-2.5 py-1 text-[11px] rounded-sm border transition-all',
                      selectedWear === level
                        ? 'bg-vintage-brown text-vintage-cream border-vintage-brown'
                        : 'border-vintage-border text-vintage-brown hover:border-vintage-brown/50'
                    )}
                  >
                    {level}级
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

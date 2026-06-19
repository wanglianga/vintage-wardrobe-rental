import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ruler } from 'lucide-react'
import { cn } from '@/lib/utils'
import EraTag from '@/components/EraTag'
import WearBadge from '@/components/WearBadge'
import DepositTag from '@/components/DepositTag'
import type { VintageItem } from '@/types'
import { outfitSets, categoryLabels } from '@/data/mock'

interface ItemCardProps {
  item: VintageItem
  index: number
}

export default function ItemCard({ item, index }: ItemCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [showOutfits, setShowOutfits] = useState(false)
  const navigate = useNavigate()

  const relatedOutfits = outfitSets.filter((o) => o.items.includes(item.id))

  return (
    <div
      className="group animate-fadeInUp cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => navigate(`/item/${item.id}`)}
    >
      <div className="relative bg-white rounded overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-0.5">
        <div className="relative overflow-hidden">
          <div
            className={cn(
              'w-full bg-vintage-tan/20 transition-opacity duration-500',
              imgLoaded ? 'opacity-0' : 'opacity-100'
            )}
            style={{ paddingBottom: '120%' }}
          />
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105',
              imgLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
          <div className="absolute top-2 left-2">
            <EraTag era={item.era} year={item.year} />
          </div>
        </div>

        <div className="p-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-vintage-brown leading-tight">
              {item.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 text-vintage-muted">
              <Ruler className="w-3 h-3" />
              {item.size}
            </span>
            <span className="text-vintage-border">|</span>
            <span className="text-vintage-muted">{categoryLabels[item.category]}</span>
          </div>

          <WearBadge level={item.wearLevel} />

          <DepositTag amount={item.deposit} />

          {relatedOutfits.length > 0 && (
            <div className="pt-1.5 border-t border-vintage-border/50">
              <button
                onClick={() => setShowOutfits(!showOutfits)}
                className="text-[10px] text-vintage-gold hover:text-vintage-crimson transition-colors font-medium"
              >
                {showOutfits ? '收起搭配' : `查看 ${relatedOutfits.length} 套搭配 ▾`}
              </button>

              {showOutfits && (
                <div className="mt-2 space-y-1.5 animate-slideDown">
                  {relatedOutfits.map((outfit) => (
                    <button
                      key={outfit.id}
                      onClick={() => navigate(`/outfit/${outfit.id}`)}
                      className="w-full flex items-center gap-2 p-2 rounded-sm bg-vintage-cream/50 hover:bg-vintage-tan/20 transition-colors text-left"
                    >
                      <div className="flex -space-x-2">
                        {outfit.items.slice(0, 3).map((itemId) => (
                          <div
                            key={itemId}
                            className="w-7 h-7 rounded-sm bg-vintage-tan/30 border border-vintage-border/30 overflow-hidden"
                          />
                        ))}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-vintage-brown truncate">
                          {outfit.name}
                        </p>
                        <p className="text-[10px] text-vintage-muted">
                          押金 ¥{outfit.totalDeposit}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

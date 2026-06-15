import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { vintageItems, outfitSets, categoryLabels } from '@/data/mock'
import { useStore } from '@/store'
import EraTag from '@/components/EraTag'
import FilterBar from '@/components/FilterBar'
import ItemCard from '@/components/ItemCard'
import DepositTag from '@/components/DepositTag'
import type { Category, WearLevel } from '@/types'

export default function BrowsePage() {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useStore()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedEra, setSelectedEra] = useState<string | null>(null)
  const [selectedWear, setSelectedWear] = useState<WearLevel | null>(null)
  const [showOutfits, setShowOutfits] = useState(false)

  const filteredItems = useMemo(() => {
    return vintageItems.filter((item) => {
      if (selectedCategory && item.category !== selectedCategory) return false
      if (selectedEra && item.era !== selectedEra) return false
      if (selectedWear && item.wearLevel !== selectedWear) return false
      return true
    })
  }, [selectedCategory, selectedEra, selectedWear])

  return (
    <div className="min-h-screen bg-vintage-cream">
      <FilterBar
        selectedCategory={selectedCategory}
        selectedEra={selectedEra}
        selectedWear={selectedWear}
        onCategoryChange={setSelectedCategory}
        onEraChange={setSelectedEra}
        onWearChange={setSelectedWear}
      />

      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-vintage-muted">
            {filteredItems.length} 件古着单品
          </p>
          <button
            onClick={() => setShowOutfits(!showOutfits)}
            className={cn(
              'text-xs px-3 py-1.5 rounded-sm border transition-all',
              showOutfits
                ? 'bg-vintage-brown text-vintage-cream border-vintage-brown'
                : 'border-vintage-border text-vintage-brown hover:border-vintage-brown/50'
            )}
          >
            {showOutfits ? '查看单品' : '查看搭配套装'}
          </button>
        </div>

        {showOutfits ? (
          <div className="space-y-3 pb-8">
            {outfitSets.map((outfit, idx) => {
              const isFav = favorites.includes(outfit.id)
              const items = outfit.items
                .map((id) => vintageItems.find((i) => i.id === id))
                .filter(Boolean)

              return (
                <div
                  key={outfit.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <button
                    onClick={() => navigate(`/outfit/${outfit.id}`)}
                    className="w-full bg-white rounded overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-left"
                  >
                    <div className="flex">
                      <div className="relative w-28 flex-shrink-0">
                        <img
                          src={outfit.images[0]}
                          alt={outfit.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 p-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-display text-base text-vintage-brown">
                            {outfit.name}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(outfit.id)
                            }}
                            className="p-1 -m-1"
                          >
                            <Heart
                              className={cn(
                                'w-5 h-5 transition-all duration-300',
                                isFav
                                  ? 'fill-vintage-crimson text-vintage-crimson animate-heartBeat'
                                  : 'text-vintage-border hover:text-vintage-crimson/50'
                              )}
                            />
                          </button>
                        </div>
                        <p className="text-[11px] text-vintage-muted mt-1 line-clamp-2">
                          {outfit.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex -space-x-1.5">
                            {items.slice(0, 3).map((item) =>
                              item ? (
                                <EraTag
                                  key={item.id}
                                  era={item.era}
                                  className="!text-[8px] !px-1.5 !py-0.5"
                                />
                              ) : null
                            )}
                          </div>
                          <ChevronRight className="w-3 h-3 text-vintage-muted ml-auto" />
                        </div>
                        <div className="mt-2">
                          <DepositTag amount={outfit.totalDeposit} size="sm" />
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="columns-2 gap-3 pb-8">
            {filteredItems.map((item, idx) => (
              <div key={item.id} className="break-inside-avoid mb-3">
                <ItemCard item={item} index={idx} />
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-vintage-muted text-sm">没有找到符合条件的古着单品</p>
            <p className="text-vintage-muted/60 text-xs mt-1">试试调整筛选条件</p>
          </div>
        )}
      </div>
    </div>
  )
}

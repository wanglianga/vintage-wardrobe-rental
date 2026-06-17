import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ChevronRight, Sparkles, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { vintageItems, categoryLabels } from '@/data/mock'
import { useStore } from '@/store'
import EraTag from '@/components/EraTag'
import FilterBar from '@/components/FilterBar'
import ItemCard from '@/components/ItemCard'
import DepositTag from '@/components/DepositTag'
import type { Category, WearLevel, VintageItem } from '@/types'

export default function BrowsePage() {
  const navigate = useNavigate()
  const { favorites, toggleFavorite, outfitSets, builderSelectedItems, toggleBuilderItem } = useStore()
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
        <div className="flex items-center justify-between mb-3 gap-2">
          <p className="text-xs text-vintage-muted flex-shrink-0">
            {showOutfits ? `${outfitSets.length} 套搭配方案` : `${filteredItems.length} 件古着单品`}
          </p>
          <div className="flex items-center gap-2">
            {!showOutfits && (
              <button
                onClick={() => navigate('/builder')}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-sm border transition-all flex items-center gap-1',
                  builderSelectedItems.length > 0
                    ? 'bg-vintage-crimson text-vintage-cream border-vintage-crimson'
                    : 'border-vintage-gold text-vintage-brown hover:bg-vintage-gold/10'
                )}
              >
                <Sparkles className="w-3 h-3" />
                搭配工作台
                {builderSelectedItems.length > 0 && (
                  <span className="bg-vintage-cream text-vintage-crimson text-[9px] px-1 rounded-full">
                    {builderSelectedItems.length}
                  </span>
                )}
              </button>
            )}
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
              <div key={item.id} className="break-inside-avoid mb-3 relative group">
                <ItemCard item={item} index={idx} />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleBuilderItem(item.id)
                  }}
                  className={cn(
                    'absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all z-10',
                    builderSelectedItems.includes(item.id)
                      ? 'bg-vintage-crimson text-white'
                      : 'bg-white/90 text-vintage-brown opacity-0 group-hover:opacity-100 hover:bg-vintage-gold hover:text-white'
                  )}
                >
                  <Plus className={cn(
                    'w-3.5 h-3.5 transition-transform',
                    builderSelectedItems.includes(item.id) && 'rotate-45'
                  )} />
                </button>
              </div>
            ))}
          </div>
        )}

        {builderSelectedItems.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-vintage-brown text-vintage-cream rounded shadow-xl p-3 flex items-center gap-3 animate-fadeInUp z-50">
            <div className="flex -space-x-2">
              {builderSelectedItems.slice(0, 4).map((id) => {
                const item = vintageItems.find((i) => i.id === id)
                return item ? (
                  <div key={id} className="w-8 h-8 rounded overflow-hidden border-2 border-vintage-brown bg-vintage-tan/20">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : null
              })}
              {builderSelectedItems.length > 4 && (
                <div className="w-8 h-8 rounded bg-vintage-crimson border-2 border-vintage-brown flex items-center justify-center text-[9px] font-bold">
                  +{builderSelectedItems.length - 4}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium">已选 {builderSelectedItems.length} 件单品</p>
              <p className="text-[10px] text-vintage-cream/70">点击前往搭配工作台</p>
            </div>
            <button
              onClick={() => navigate('/builder')}
              className="px-3 py-1.5 bg-vintage-crimson text-white text-[11px] rounded-sm font-medium hover:bg-vintage-crimson/90 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              去搭配
            </button>
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

import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { Heart, ArrowLeft, Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { outfitSets, vintageItems } from '@/data/mock'
import { useStore } from '@/store'
import EraTag from '@/components/EraTag'
import WearBadge from '@/components/WearBadge'
import DepositTag from '@/components/DepositTag'
import DatePicker from '@/components/DatePicker'
import DepositPanel from '@/components/DepositPanel'
import type { RentalOrder } from '@/types'

export default function OutfitDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { favorites, toggleFavorite, addRentalOrder } = useStore()

  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const outfit = outfitSets.find((o) => o.id === id)
  const items = useMemo(
    () =>
      outfit
        ? outfit.items.map((itemId) => vintageItems.find((i) => i.id === itemId)).filter(Boolean) as typeof vintageItems
        : [],
    [outfit]
  )

  if (!outfit) {
    return (
      <div className="min-h-screen bg-vintage-cream flex items-center justify-center">
        <p className="text-vintage-muted">搭配套装不存在</p>
      </div>
    )
  }

  const isFav = favorites.includes(outfit.id)
  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 0
    return Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
  }, [startDate, endDate])

  const daysUntilReturn = useMemo(() => {
    if (!endDate) return null
    const diff = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }, [endDate])

  const handleConfirmRental = () => {
    if (!startDate || !endDate) return
    const order: RentalOrder = {
      id: `order-${Date.now()}`,
      customerName: '当前顾客',
      outfitId: outfit.id,
      itemIds: outfit.items,
      startDate,
      endDate,
      totalDeposit: outfit.totalDeposit,
      status: 'active'
    }
    addRentalOrder(order)
    setShowConfirm(true)
  }

  return (
    <div className="min-h-screen bg-vintage-cream animate-fadeIn">
      <div className="sticky top-14 z-40 bg-vintage-cream/95 backdrop-blur-sm border-b border-vintage-border">
        <div className="max-w-3xl mx-auto px-4 h-10 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs text-vintage-brown hover:text-vintage-crimson transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <span className="font-display text-sm text-vintage-brown flex-1 truncate">
            {outfit.name}
          </span>
          <button
            onClick={() => toggleFavorite(outfit.id)}
            className="p-1.5"
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
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
        <div className="relative rounded overflow-hidden shadow-lg">
          <img
            src={outfit.images[0]}
            alt={outfit.name}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h1 className="font-display text-2xl text-white">{outfit.name}</h1>
            <p className="text-xs text-white/80 mt-1">{outfit.description}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-display text-vintage-brown mb-2">套装单品</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-white rounded shadow-sm p-3 border border-vintage-border/20"
              >
                <div className="w-16 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-vintage-tan/20">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-vintage-brown">{item.name}</h3>
                    <EraTag era={item.era} year={item.year} />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-vintage-muted">
                    <span>尺码 {item.size}</span>
                    <span className="text-vintage-border">|</span>
                    <span>{item.category === 'tops' ? '上装' : item.category === 'bottoms' ? '下装' : item.category === 'outerwear' ? '外套' : item.category === 'dress' ? '连衣裙' : item.category === 'accessories' ? '配饰' : '鞋履'}</span>
                  </div>
                  <WearBadge level={item.wearLevel} />
                  <DepositTag amount={item.deposit} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-display text-vintage-brown mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-vintage-gold" />
            选择租赁日期
          </h2>
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            onStartChange={setStartDate}
            onEndChange={setEndDate}
          />
          <p className="text-[10px] text-vintage-muted mt-1.5">
            先选择起租日，再选择归还日。租赁期最少3天，最多30天。
          </p>
        </div>

        {daysUntilReturn !== null && daysUntilReturn >= 0 && (
          <div className="bg-vintage-crimson/10 border border-vintage-crimson/20 rounded-sm p-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-vintage-crimson flex-shrink-0" />
            <div>
              <p className="text-xs text-vintage-crimson font-medium">
                归还提醒
              </p>
              <p className="text-[10px] text-vintage-crimson/70">
                距归还日还有 <strong>{daysUntilReturn}</strong> 天（{endDate}）
              </p>
            </div>
          </div>
        )}

        <DepositPanel
          items={items}
          totalDeposit={outfit.totalDeposit}
          rentalDays={rentalDays}
        />

        {!showConfirm ? (
          <button
            onClick={handleConfirmRental}
            disabled={!startDate || !endDate || rentalDays < 3}
            className={cn(
              'w-full py-3 rounded text-sm font-medium transition-all duration-300',
              startDate && endDate && rentalDays >= 3
                ? 'bg-vintage-brown text-vintage-cream hover:bg-vintage-brown/90 active:scale-[0.98]'
                : 'bg-vintage-border/30 text-vintage-muted cursor-not-allowed'
            )}
          >
            {rentalDays > 0 && rentalDays < 3
              ? '租期最少3天'
              : !startDate
                ? '请选择起租日期'
                : !endDate
                  ? '请选择归还日期'
                  : '确认租赁'}
          </button>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-4 text-center animate-fadeIn">
            <p className="text-sm font-medium text-emerald-700">租赁确认成功！</p>
            <p className="text-xs text-emerald-600 mt-1">
              请于 {startDate} 前到店取衣，{endDate} 前归还
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

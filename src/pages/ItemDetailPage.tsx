import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { ArrowLeft, Calendar, AlertCircle, CheckCircle, ShoppingCart, Sparkles, Package, Info, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { vintageItems, categoryLabels, wearLevelLabels } from '@/data/mock'
import { useStore } from '@/store'
import EraTag from '@/components/EraTag'
import WearBadge from '@/components/WearBadge'
import DepositTag from '@/components/DepositTag'
import DatePicker from '@/components/DatePicker'
import type { VintageItem, RentalOrder } from '@/types'
import {
  getItemDetailedAvailability,
  getItemStatusLabel,
  getItemStatusColor,
  findSameStyleItems,
  findSameStyleAvailableSizes,
  getItemOccupiedDates,
  findStyleAlternatives
} from '@/lib/utils'

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addRentalOrder, toggleBuilderItem, builderSelectedItems } = useStore()

  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const item = vintageItems.find((i) => i.id === id)

  const sameStyleAllSizes = useMemo(
    () => (item ? findSameStyleItems(item) : []),
    [item]
  )

  const sizeOptions: VintageItem[] = useMemo(() => {
    if (!item) return []
    if (sameStyleAllSizes.length === 0) return [item]
    return [item, ...sameStyleAllSizes]
  }, [item, sameStyleAllSizes])

  const currentItem = useMemo(() => {
    if (!item) return null
    if (selectedSizeId) {
      return sizeOptions.find((s) => s.id === selectedSizeId) || item
    }
    return item
  }, [item, selectedSizeId, sizeOptions])

  const availability = useMemo(
    () => (currentItem ? getItemDetailedAvailability(currentItem, startDate, endDate) : null),
    [currentItem, startDate, endDate]
  )

  const sameStyleAvailable = useMemo(() => {
    if (!currentItem || !startDate || !endDate) return []
    return findSameStyleAvailableSizes(currentItem, startDate, endDate)
  }, [currentItem, startDate, endDate])

  const occupiedDates = useMemo(
    () => (currentItem ? getItemOccupiedDates(currentItem) : []),
    [currentItem]
  )

  const styleAlternatives = useMemo(() => {
    if (!currentItem) return []
    if (availability?.available) return []
    return findStyleAlternatives(currentItem, startDate, endDate)
  }, [currentItem, availability, startDate, endDate])

  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 0
    return Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
  }, [startDate, endDate])

  const isInBuilder = currentItem ? builderSelectedItems.includes(currentItem.id) : false

  if (!item) {
    return (
      <div className="min-h-screen bg-vintage-cream flex items-center justify-center">
        <p className="text-vintage-muted">单品不存在</p>
      </div>
    )
  }

  const handleRent = () => {
    if (!currentItem || !startDate || !endDate || !availability?.available) return
    const order: RentalOrder = {
      id: `order-${Date.now()}`,
      customerName: '当前顾客',
      outfitId: '',
      itemIds: [currentItem.id],
      startDate,
      endDate,
      totalDeposit: currentItem.deposit,
      status: 'active'
    }
    addRentalOrder(order)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleAddToBuilder = () => {
    if (!currentItem) return
    toggleBuilderItem(currentItem.id)
  }

  const handleSelectAlternative = (altItem: VintageItem) => {
    setSelectedSizeId(altItem.id)
  }

  return (
    <div className="min-h-screen bg-vintage-cream animate-fadeIn">
      <div className="sticky top-14 z-40 bg-vintage-cream/95 backdrop-blur-sm border-b border-vintage-border">
        <div className="max-w-3xl mx-auto px-4 h-12 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs text-vintage-brown hover:text-vintage-crimson transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <span className="font-display text-sm text-vintage-brown flex-1 truncate">
            {item.name}
          </span>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-50 border border-emerald-200 rounded-sm px-4 py-2 shadow-lg animate-fadeIn">
          <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            预约成功！请于 {startDate} 前到店取衣
          </p>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
        <div className="relative rounded overflow-hidden shadow-lg">
          <img
            src={currentItem?.image || item.image}
            alt={item.name}
            className="w-full aspect-[4/3] object-cover"
          />
          <div className="absolute top-3 left-3">
            <EraTag era={item.era} year={item.year} className="!text-xs !px-3 !py-1" />
          </div>
          {availability && (
            <div className={cn(
              'absolute top-3 right-3 px-3 py-1 rounded text-xs font-medium border',
              getItemStatusColor(availability.status)
            )}>
              {getItemStatusLabel(availability.status)}
            </div>
          )}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h1 className="font-display text-2xl text-white">{item.name}</h1>
            <p className="text-xs text-white/80 mt-1">{currentItem?.description || item.description}</p>
          </div>
        </div>

        <div className="bg-white rounded shadow-sm border border-vintage-border/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-display text-vintage-brown">单品信息</h2>
            </div>
            <DepositTag amount={currentItem?.deposit || item.deposit} />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-vintage-gold" />
              <span className="text-vintage-muted">品类：</span>
              <span className="text-vintage-brown">{categoryLabels[item.category]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-vintage-gold" />
              <span className="text-vintage-muted">成色：</span>
              <span className="text-vintage-brown">{wearLevelLabels[item.wearLevel]}</span>
            </div>
            {item.color && (
              <div className="flex items-center gap-2">
                <span className="text-vintage-muted">颜色：</span>
                <span className="text-vintage-brown">{item.color}</span>
              </div>
            )}
            <WearBadge level={item.wearLevel} />
          </div>

          {item.styleTags && item.styleTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-vintage-border/20">
              {item.styleTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 bg-vintage-gold/10 text-vintage-brown rounded-sm border border-vintage-gold/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {sizeOptions.length > 1 && (
          <div className="bg-white rounded shadow-sm border border-vintage-border/30 p-4">
            <h3 className="text-sm font-display text-vintage-brown mb-3 flex items-center gap-1">
              选择尺码
            </h3>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((sizeItem) => {
                const sizeAvail = getItemDetailedAvailability(sizeItem, startDate, endDate)
                const isSelected = (selectedSizeId === sizeItem.id) || (!selectedSizeId && sizeItem.id === item.id)
                return (
                  <button
                    key={sizeItem.id}
                    onClick={() => setSelectedSizeId(sizeItem.id)}
                    className={cn(
                      'relative px-4 py-2 rounded-sm border text-xs font-medium transition-all',
                      isSelected
                        ? sizeAvail.available
                          ? 'bg-vintage-brown text-vintage-cream border-vintage-brown'
                          : 'bg-vintage-crimson/80 text-white border-vintage-crimson'
                        : sizeAvail.available
                          ? 'border-vintage-border/40 text-vintage-brown hover:border-vintage-gold/60'
                          : 'border-vintage-crimson/20 text-vintage-crimson/60 cursor-not-allowed opacity-70'
                    )}
                  >
                    {sizeItem.size}
                    {!sizeAvail.available && startDate && endDate && (
                      <span className="block text-[9px] mt-0.5 opacity-80">
                        {sizeAvail.message}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {!availability?.available && availability?.status === 'rented' && sameStyleAvailable.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-sm p-3 flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-amber-800">
                当前尺码在所选日期已租出
              </p>
              <p className="text-[11px] text-amber-700 mt-0.5">
                同款其他尺码可租：
                {sameStyleAvailable.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectAlternative(s)}
                    className="ml-1 underline hover:text-amber-900"
                  >
                    {s.size}{idx < sameStyleAvailable.length - 1 ? '、' : ''}
                  </button>
                ))}
              </p>
            </div>
          </div>
        )}

        {!availability?.available && availability?.status === 'maintenance' && (
          <div className="bg-amber-50 border border-amber-200 rounded-sm p-3 flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-amber-800">
                当前单品在所选日期维修中
              </p>
              {sameStyleAvailable.length > 0 && (
                <p className="text-[11px] text-amber-700 mt-0.5">
                  同款其他尺码可租：
                  {sameStyleAvailable.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => handleSelectAlternative(s)}
                      className="ml-1 underline hover:text-amber-900"
                    >
                      {s.size}{idx < sameStyleAvailable.length - 1 ? '、' : ''}
                    </button>
                  ))}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded shadow-sm border border-vintage-border/30">
          <div className="p-4 border-b border-vintage-border/20">
            <h3 className="text-sm font-display text-vintage-brown flex items-center gap-2">
              <Calendar className="w-4 h-4 text-vintage-gold" />
              选择租赁日期
            </h3>
          </div>
          <div className="p-4">
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              onStartChange={setStartDate}
              onEndChange={setEndDate}
              occupiedDates={occupiedDates}
            />
            <p className="text-[10px] text-vintage-muted mt-2">
              红色标记日期已被占用（已租出或维修中），不可选择。先选择起租日，再选择归还日。租赁期最少3天。
            </p>
          </div>
        </div>

        {availability && !availability.available && (
          <div className="bg-vintage-crimson/5 border border-vintage-crimson/20 rounded-sm p-3">
            <p className="text-xs text-vintage-crimson font-medium flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {availability.message}
            </p>
          </div>
        )}

        {styleAlternatives.length > 0 && (
          <div className="bg-white rounded shadow-sm border border-vintage-border/30 p-4">
            <h3 className="text-sm font-display text-vintage-brown mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-vintage-gold" />
              风格相近替代单品
            </h3>
            <div className="space-y-2">
              {styleAlternatives.map((alt) => (
                <button
                  key={alt.item.id}
                  onClick={() => handleSelectAlternative(alt.item)}
                  className="w-full flex items-center gap-3 p-2 rounded-sm bg-vintage-cream/40 hover:bg-vintage-tan/20 transition-colors text-left border border-vintage-border/20"
                >
                  <div className="w-12 h-14 rounded-sm overflow-hidden bg-vintage-tan/20 flex-shrink-0">
                    <img src={alt.item.image} alt={alt.item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-vintage-brown truncate">{alt.item.name}</p>
                      <EraTag era={alt.item.era} className="!text-[8px] !px-1 !py-0.5" />
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-vintage-muted">{alt.item.size}</span>
                      <span className="text-vintage-border/60">·</span>
                      <span className="text-[10px] text-vintage-muted">{categoryLabels[alt.item.category]}</span>
                    </div>
                    <p className="text-[9px] text-emerald-600 mt-0.5">
                      匹配度 {alt.matchScore}% · {alt.matchReasons.join('；')}
                    </p>
                  </div>
                  <DepositTag amount={alt.item.deposit} size="sm" />
                </button>
              ))}
            </div>
          </div>
        )}

        {startDate && endDate && (
          <div className="bg-white rounded shadow-sm border border-vintage-border/30 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-vintage-muted">租期</span>
              <span className="text-vintage-brown font-medium">{rentalDays} 天</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-vintage-muted">押金</span>
              <span className="text-vintage-crimson font-bold text-base">¥{currentItem?.deposit || item.deposit}</span>
            </div>
          </div>
        )}

        <div className="space-y-2 pb-4">
          <div className="flex gap-2">
            <button
              onClick={handleAddToBuilder}
              className={cn(
                'flex-1 py-3 rounded text-xs font-medium transition-all duration-300 border flex items-center justify-center gap-1.5',
                isInBuilder
                  ? 'bg-vintage-crimson text-vintage-cream border-vintage-crimson'
                  : 'bg-white border-vintage-brown text-vintage-brown hover:bg-vintage-brown/5 active:scale-[0.98]'
              )}
            >
              <Package className="w-4 h-4" />
              {isInBuilder ? '已加入搭配' : '加入搭配工作台'}
            </button>
            <button
              onClick={handleRent}
              disabled={!startDate || !endDate || !availability?.available || rentalDays < 3}
              className={cn(
                'flex-1 py-3 rounded text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1.5',
                startDate && endDate && availability?.available && rentalDays >= 3
                  ? 'bg-vintage-brown text-vintage-cream hover:bg-vintage-brown/90 active:scale-[0.98]'
                  : 'bg-vintage-border/30 text-vintage-muted cursor-not-allowed'
              )}
            >
              <ShoppingCart className="w-4 h-4" />
              {!startDate || !endDate
                ? '请选择租赁日期'
                : !availability?.available
                  ? availability?.message
                  : rentalDays < 3
                    ? '租期最少3天'
                    : `立即预约（押金 ¥${currentItem?.deposit || item.deposit}）`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

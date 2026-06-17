import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Minus, Save, Shirt, Calendar, AlertTriangle, AlertCircle, CheckCircle, Sparkles, Coins, ShoppingCart, Package } from 'lucide-react'
import { cn } from '@/lib/utils'
import { checkOutfitConflicts, calculateMergedDeposit } from '@/lib/utils'
import { vintageItems, categoryLabels } from '@/data/mock'
import { useStore } from '@/store'
import EraTag from '@/components/EraTag'
import DepositTag from '@/components/DepositTag'
import DatePicker from '@/components/DatePicker'
import type { Category, VintageItem, RentalOrder, OutfitSet } from '@/types'

export default function OutfitBuilderPage() {
  const navigate = useNavigate()
  const { builderSelectedItems, toggleBuilderItem, clearBuilderItems, addOutfitSet, addRentalOrder } = useStore()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [outfitName, setOutfitName] = useState('')
  const [outfitDescription, setOutfitDescription] = useState('')
  const [rentMode, setRentMode] = useState<'set' | 'individual'>('set')
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [rentSuccess, setRentSuccess] = useState(false)

  const selectedItems = useMemo(
    () => builderSelectedItems.map((id) => vintageItems.find((i) => i.id === id)).filter(Boolean) as VintageItem[],
    [builderSelectedItems]
  )

  const conflicts = useMemo(
    () => checkOutfitConflicts(selectedItems, startDate, endDate),
    [selectedItems, startDate, endDate]
  )

  const depositInfo = useMemo(
    () => calculateMergedDeposit(selectedItems),
    [selectedItems]
  )

  const filteredItems = useMemo(() => {
    return vintageItems.filter((item) => {
      if (selectedCategory && item.category !== selectedCategory) return false
      return true
    })
  }, [selectedCategory])

  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 0
    return Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
  }, [startDate, endDate])

  const categories: (Category | null)[] = [null, 'outerwear', 'tops', 'bottoms', 'dress', 'shoes', 'accessories', 'bags']

  const handleSaveOutfit = () => {
    if (!outfitName.trim() || selectedItems.length === 0) return
    const newOutfit: OutfitSet = {
      id: `outfit-${Date.now()}`,
      name: outfitName.trim(),
      description: outfitDescription.trim() || `自定义搭配 · ${selectedItems.length}件单品`,
      items: selectedItems.map((i) => i.id),
      totalDeposit: depositInfo.final,
      images: [selectedItems[0]?.image || '']
    }
    addOutfitSet(newOutfit)
    setSavedSuccess(true)
    setShowSaveDialog(false)
    setOutfitName('')
    setOutfitDescription('')
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const handleRentSet = () => {
    if (!startDate || !endDate || selectedItems.length === 0) return
    const order: RentalOrder = {
      id: `order-${Date.now()}`,
      customerName: '当前顾客',
      outfitId: '',
      itemIds: selectedItems.map((i) => i.id),
      startDate,
      endDate,
      totalDeposit: depositInfo.final,
      status: 'active'
    }
    addRentalOrder(order)
    setRentSuccess(true)
    setTimeout(() => {
      setRentSuccess(false)
      clearBuilderItems()
    }, 3000)
  }

  const handleRentIndividual = () => {
    if (!startDate || !endDate || selectedItems.length === 0) return
    selectedItems.forEach((item, idx) => {
      const order: RentalOrder = {
        id: `order-${Date.now()}-${idx}`,
        customerName: '当前顾客',
        outfitId: '',
        itemIds: [item.id],
        startDate,
        endDate,
        totalDeposit: item.deposit,
        status: 'active'
      }
      addRentalOrder(order)
    })
    setRentSuccess(true)
    setTimeout(() => {
      setRentSuccess(false)
      clearBuilderItems()
    }, 3000)
  }

  const hasError = conflicts.some((c) => c.severity === 'error')

  return (
    <div className="min-h-screen bg-vintage-cream">
      <div className="sticky top-14 z-40 bg-vintage-cream/95 backdrop-blur-sm border-b border-vintage-border">
        <div className="max-w-5xl mx-auto px-4 h-12 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs text-vintage-brown hover:text-vintage-crimson transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <span className="font-display text-sm text-vintage-brown flex-1">
            <Sparkles className="w-4 h-4 inline mr-1 text-vintage-gold" />
            套装搭配工作台
          </span>
          <span className="text-[10px] text-vintage-muted">
            已选 {selectedItems.length} 件
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-4">
        {savedSuccess && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-sm p-3 text-center animate-fadeIn">
            <p className="text-xs text-emerald-700 font-medium flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4" />
              套装已保存！可在「查看搭配套装」中找到
            </p>
          </div>
        )}
        {rentSuccess && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-sm p-3 text-center animate-fadeIn">
            <p className="text-xs text-emerald-700 font-medium flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4" />
              预约成功！请于 {startDate} 前到店取衣
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded shadow-sm border border-vintage-border/30 p-3">
              <h3 className="text-xs font-display text-vintage-brown mb-2 flex items-center gap-1">
                <Shirt className="w-3.5 h-3.5 text-vintage-gold" />
                选择单品
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {categories.map((cat) => (
                  <button
                    key={cat || 'all'}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'text-[10px] px-2.5 py-1 rounded-sm border transition-all',
                      selectedCategory === cat
                        ? 'bg-vintage-brown text-vintage-cream border-vintage-brown'
                        : 'border-vintage-border/40 text-vintage-muted hover:border-vintage-brown/40 hover:text-vintage-brown'
                    )}
                  >
                    {cat ? categoryLabels[cat] : '全部'}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-96 overflow-y-auto pr-1">
                {filteredItems.map((item) => {
                  const isSelected = builderSelectedItems.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleBuilderItem(item.id)}
                      className={cn(
                        'relative rounded overflow-hidden border-2 transition-all group',
                        isSelected
                          ? 'border-vintage-crimson ring-2 ring-vintage-crimson/20'
                          : 'border-vintage-border/30 hover:border-vintage-gold/60'
                      )}
                    >
                      <div className="relative aspect-[3/4] bg-vintage-tan/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-1 left-1">
                          <EraTag era={item.era} className="!text-[8px] !px-1 !py-0.5" />
                        </div>
                        <div
                          className={cn(
                            'absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center transition-all',
                            isSelected
                              ? 'bg-vintage-crimson text-white'
                              : 'bg-white/80 text-vintage-border group-hover:bg-vintage-gold/20'
                          )}
                        >
                          {isSelected ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        </div>
                      </div>
                      <div className="p-1.5 bg-white">
                        <p className="text-[10px] text-vintage-brown truncate font-medium">{item.name}</p>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-[9px] text-vintage-muted">{item.size}</span>
                          <span className="text-[9px] text-vintage-crimson font-medium">¥{item.deposit}</span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {conflicts.length > 0 && (
              <div className="bg-white rounded shadow-sm border border-vintage-border/30 p-3">
                <h3 className="text-xs font-display text-vintage-brown mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  搭配提示
                </h3>
                <div className="space-y-1.5">
                  {conflicts.map((conflict, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'flex items-start gap-2 p-2 rounded-sm text-[11px]',
                        conflict.severity === 'error'
                          ? 'bg-vintage-crimson/10 border border-vintage-crimson/20'
                          : 'bg-amber-50 border border-amber-200'
                      )}
                    >
                      {conflict.severity === 'error' ? (
                        <AlertCircle className="w-3.5 h-3.5 text-vintage-crimson flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className={cn(
                          'font-medium',
                          conflict.severity === 'error' ? 'text-vintage-crimson' : 'text-amber-700'
                        )}>
                          {conflict.type === 'size' && '尺码冲突：'}
                          {conflict.type === 'color' && '颜色提示：'}
                          {conflict.type === 'era' && '年代提示：'}
                          {conflict.type === 'rental_period' && '租期提示：'}
                        </span>
                        <span className={cn(
                          conflict.severity === 'error' ? 'text-vintage-crimson/80' : 'text-amber-600'
                        )}>
                          {conflict.message}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded shadow-sm border border-vintage-border/30 overflow-hidden">
              <div className="p-3 border-b border-vintage-border/20 bg-gradient-to-r from-vintage-tan/10 to-vintage-gold/10">
                <h3 className="text-sm font-display text-vintage-brown flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-vintage-gold" />
                  我的搭配卡
                </h3>
              </div>
              <div className="p-3">
                {selectedItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Shirt className="w-10 h-10 mx-auto text-vintage-border/50 mb-2" />
                    <p className="text-xs text-vintage-muted">从左侧选择单品开始搭配</p>
                    <p className="text-[10px] text-vintage-muted/60 mt-1">建议选择2-5件单品组成套装</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 p-2 bg-vintage-cream/40 rounded-sm"
                      >
                        <div className="w-10 h-12 rounded-sm overflow-hidden bg-vintage-tan/20 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-vintage-brown truncate">{item.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[9px] text-vintage-muted">{categoryLabels[item.category]}</span>
                            <span className="text-vintage-border/60">·</span>
                            <span className="text-[9px] text-vintage-muted">{item.size}</span>
                            {item.color && (
                              <>
                                <span className="text-vintage-border/60">·</span>
                                <span className="text-[9px] text-vintage-muted">{item.color}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <DepositTag amount={item.deposit} size="sm" />
                        <button
                          onClick={() => toggleBuilderItem(item.id)}
                          className="p-1 text-vintage-border hover:text-vintage-crimson transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded shadow-sm border border-vintage-border/30">
              <div className="p-3 border-b border-vintage-border/20">
                <h3 className="text-xs font-display text-vintage-brown flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-vintage-gold" />
                  选择租赁日期
                </h3>
              </div>
              <div className="p-3">
                <DatePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartChange={setStartDate}
                  onEndChange={setEndDate}
                />
              </div>
            </div>

            <div className="bg-white rounded shadow-sm border border-vintage-border/30">
              <div className="p-3 border-b border-vintage-border/20">
                <h3 className="text-xs font-display text-vintage-brown flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-vintage-gold" />
                  押金合并计算
                </h3>
              </div>
              <div className="p-3 space-y-2">
                {depositInfo.breakdown.map((b) => (
                  <div key={b.id} className="flex items-center justify-between text-[11px]">
                    <span className="text-vintage-brown truncate mr-2">{b.name}</span>
                    <span className="text-vintage-crimson font-medium flex-shrink-0">¥{b.deposit}</span>
                  </div>
                ))}
                <div className="border-t border-vintage-border/20 pt-2 mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-vintage-muted">单品押金合计</span>
                    <span className="text-vintage-brown">¥{depositInfo.total}</span>
                  </div>
                  {depositInfo.discount > 0 && (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-emerald-600">
                        套装优惠（{selectedItems.length >= 3 ? '10%' : '5%'}折扣）
                      </span>
                      <span className="text-emerald-600 font-medium">-¥{depositInfo.discount}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-medium text-vintage-brown">合并押金</span>
                    <span className="text-base font-bold text-vintage-crimson">¥{depositInfo.final}</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-vintage-border/10 bg-vintage-cream/30 -mx-3 -mb-3 px-3 py-2 rounded-b">
                  <p className="text-[9px] text-vintage-muted leading-relaxed">
                    <strong className="text-vintage-brown">押金合并说明：</strong>
                    套装租赁时，多件单品押金合并计算，2件享95折，3件及以上享9折优惠。
                    归还时无损伤则全额退还。若选择单品分别预约，则不享受优惠，每件单独计算押金。
                  </p>
                </div>
              </div>
            </div>

            {selectedItems.length > 0 && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSaveDialog(true)}
                    className="flex-1 py-2.5 bg-white border border-vintage-brown text-vintage-brown text-xs font-medium rounded hover:bg-vintage-brown/5 transition-colors active:scale-[0.98] flex items-center justify-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    保存套装
                  </button>
                  <button
                    onClick={clearBuilderItems}
                    className="py-2.5 px-3 bg-white border border-vintage-border/40 text-vintage-muted text-xs rounded hover:border-vintage-crimson/40 hover:text-vintage-crimson transition-colors"
                  >
                    清空
                  </button>
                </div>

                <div className="bg-white rounded shadow-sm border border-vintage-border/30 p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => setRentMode('set')}
                      className={cn(
                        'flex-1 py-2 text-[11px] rounded-sm border transition-all flex items-center justify-center gap-1',
                        rentMode === 'set'
                          ? 'bg-vintage-brown text-vintage-cream border-vintage-brown'
                          : 'border-vintage-border/40 text-vintage-muted hover:border-vintage-brown/40'
                      )}
                    >
                      <Package className="w-3.5 h-3.5" />
                      整套预约
                    </button>
                    <button
                      onClick={() => setRentMode('individual')}
                      className={cn(
                        'flex-1 py-2 text-[11px] rounded-sm border transition-all flex items-center justify-center gap-1',
                        rentMode === 'individual'
                          ? 'bg-vintage-brown text-vintage-cream border-vintage-brown'
                          : 'border-vintage-border/40 text-vintage-muted hover:border-vintage-brown/40'
                      )}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      单品分别预约
                    </button>
                  </div>

                  {rentMode === 'set' ? (
                    <button
                      onClick={handleRentSet}
                      disabled={!startDate || !endDate || hasError || rentalDays < 3}
                      className={cn(
                        'w-full py-2.5 rounded text-xs font-medium transition-all duration-300',
                        startDate && endDate && !hasError && rentalDays >= 3
                          ? 'bg-vintage-crimson text-vintage-cream hover:bg-vintage-crimson/90 active:scale-[0.98]'
                          : 'bg-vintage-border/30 text-vintage-muted cursor-not-allowed'
                      )}
                    >
                      {!startDate || !endDate
                        ? '请先选择租赁日期'
                        : hasError
                          ? '请修正错误后预约'
                          : rentalDays < 3
                            ? '租期最少3天'
                            : `确认整套预约（押金 ¥${depositInfo.final}）`}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-[10px] text-vintage-muted bg-vintage-cream/50 rounded-sm p-2">
                        选择单品分别预约将生成 {selectedItems.length} 个独立订单，不享受套装押金优惠
                      </div>
                      <button
                        onClick={handleRentIndividual}
                        disabled={!startDate || !endDate || hasError || rentalDays < 3}
                        className={cn(
                          'w-full py-2.5 rounded text-xs font-medium transition-all duration-300',
                          startDate && endDate && !hasError && rentalDays >= 3
                            ? 'bg-vintage-brown text-vintage-cream hover:bg-vintage-brown/90 active:scale-[0.98]'
                            : 'bg-vintage-border/30 text-vintage-muted cursor-not-allowed'
                        )}
                      >
                        {!startDate || !endDate
                          ? '请先选择租赁日期'
                          : hasError
                            ? '请修正错误后预约'
                            : rentalDays < 3
                              ? '租期最少3天'
                              : `分别预约 ${selectedItems.length} 件单品`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fadeIn">
          <div className="bg-white rounded shadow-xl w-full max-w-sm overflow-hidden animate-fadeInUp">
            <div className="p-4 border-b border-vintage-border/20">
              <h3 className="text-sm font-display text-vintage-brown">保存我的套装</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-[11px] text-vintage-brown font-medium block mb-1">套装名称</label>
                <input
                  type="text"
                  value={outfitName}
                  onChange={(e) => setOutfitName(e.target.value)}
                  placeholder="给你的搭配起个名字"
                  className="w-full p-2 text-xs border border-vintage-border/30 rounded-sm bg-vintage-cream/30 text-vintage-brown placeholder:text-vintage-muted/50"
                />
              </div>
              <div>
                <label className="text-[11px] text-vintage-brown font-medium block mb-1">搭配心得（选填）</label>
                <textarea
                  value={outfitDescription}
                  onChange={(e) => setOutfitDescription(e.target.value)}
                  placeholder="说说这套搭配的灵感..."
                  rows={3}
                  className="w-full p-2 text-xs border border-vintage-border/30 rounded-sm bg-vintage-cream/30 text-vintage-brown placeholder:text-vintage-muted/50 resize-none"
                />
              </div>
              <div className="text-[10px] text-vintage-muted bg-vintage-cream/50 rounded-sm p-2">
                将保存 {selectedItems.length} 件单品，合并押金 ¥{depositInfo.final}
              </div>
            </div>
            <div className="p-4 border-t border-vintage-border/20 flex gap-2">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 py-2 text-xs border border-vintage-border/40 text-vintage-muted rounded-sm hover:border-vintage-brown/40 hover:text-vintage-brown transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSaveOutfit}
                disabled={!outfitName.trim()}
                className={cn(
                  'flex-1 py-2 text-xs rounded-sm font-medium transition-colors',
                  outfitName.trim()
                    ? 'bg-vintage-brown text-vintage-cream hover:bg-vintage-brown/90'
                    : 'bg-vintage-border/30 text-vintage-muted cursor-not-allowed'
                )}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

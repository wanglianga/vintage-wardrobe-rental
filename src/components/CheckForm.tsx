import { useState } from 'react'
import { ChevronDown, ChevronUp, Droplets, Shirt, Link2, Layers, Wind, Scissors, Camera, Images, AlertCircle, Coins, AlertTriangle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { assessDamage, getDamageLevelLabel, getDamageLevelColor } from '@/lib/utils'
import type { RentalOrder, ReturnCheckItem, CheckStatus, PhotoRecord } from '@/types'
import { vintageItems } from '@/data/mock'

interface CheckFormProps {
  order: RentalOrder
  onSave: (orderId: string, checks: ReturnCheckItem[]) => void
}

const checkItems = [
  { key: 'stains' as const, label: '污渍', icon: Droplets },
  { key: 'missingButtons' as const, label: '缺扣', icon: Shirt },
  { key: 'zipperIssue' as const, label: '拉链', icon: Link2 },
  { key: 'liningIssue' as const, label: '内衬', icon: Layers },
  { key: 'odor' as const, label: '异味', icon: Wind },
  { key: 'tear' as const, label: '破损', icon: Scissors }
] as const

export default function CheckForm({ order, onSave }: CheckFormProps) {
  const [checks, setChecks] = useState<ReturnCheckItem[]>(
    order.itemIds.map((itemId) => ({
      itemId,
      stains: 'ok' as CheckStatus,
      missingButtons: 'ok' as CheckStatus,
      zipperIssue: 'ok' as CheckStatus,
      liningIssue: 'ok' as CheckStatus,
      odor: 'ok' as CheckStatus,
      tear: 'ok' as CheckStatus,
      notes: '',
      photos: []
    }))
  )
  const [expandedItem, setExpandedItem] = useState<string | null>(order.itemIds[0] || null)
  const [showImages, setShowImages] = useState<string | null>(null)
  const [showDisputeDialog, setShowDisputeDialog] = useState<string | null>(null)
  const [disputeNote, setDisputeNote] = useState('')

  const updateCheck = (itemId: string, field: keyof ReturnCheckItem, value: string | CheckStatus | PhotoRecord[]) => {
    setChecks((prev) =>
      prev.map((c) => (c.itemId === itemId ? { ...c, [field]: value } : c))
    )
  }

  const addPhoto = (itemId: string) => {
    const item = vintageItems.find((i) => i.id === itemId)
    const mockPhoto: PhotoRecord = {
      id: `photo-${Date.now()}`,
      url: item?.image || '',
      type: 'after',
      timestamp: new Date().toISOString(),
      note: '归还时拍摄'
    }
    const check = checks.find((c) => c.itemId === itemId)
    updateCheck(itemId, 'photos', [...(check?.photos || []), mockPhoto])
  }

  const hasDamage = checks.some((c) =>
    c.stains === 'damaged' || c.missingButtons === 'damaged' ||
    c.zipperIssue === 'damaged' || c.liningIssue === 'damaged' ||
    c.odor === 'damaged' || c.tear === 'damaged'
  )

  const totalFees = checks.reduce((sum, check) => {
    const item = vintageItems.find((i) => i.id === check.itemId)
    if (!item) return sum
    const assessment = assessDamage(check, item.deposit)
    return sum + (assessment.cleaningFee || 0) + (assessment.repairFee || 0) + (assessment.depositDeduction || 0)
  }, 0)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-display text-vintage-brown">物品状态检查</h3>
        {hasDamage && (
          <span className="text-[10px] text-vintage-crimson font-medium bg-vintage-crimson/10 px-2 py-0.5 rounded-sm">
            有损伤项
          </span>
        )}
      </div>

      {totalFees > 0 && (
        <div className="bg-vintage-crimson/5 border border-vintage-crimson/20 rounded-sm p-3">
          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-4 h-4 text-vintage-crimson" />
            <span className="text-xs font-medium text-vintage-crimson">预估费用</span>
          </div>
          <div className="text-[11px] text-vintage-muted">
            清洗费 + 维修费 + 押金扣减合计：
            <span className="text-vintage-crimson font-bold text-sm ml-1">¥{totalFees}</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {checks.map((check) => {
          const item = vintageItems.find((i) => i.id === check.itemId)
          if (!item) return null
          const isExpanded = expandedItem === check.itemId
          const itemDamaged = check.stains === 'damaged' || check.missingButtons === 'damaged' ||
            check.zipperIssue === 'damaged' || check.liningIssue === 'damaged' ||
            check.odor === 'damaged' || check.tear === 'damaged'
          const assessment = assessDamage(check, item.deposit)

          return (
            <div key={check.itemId} className="bg-white rounded shadow-sm border border-vintage-border/20 overflow-hidden">
              <button
                onClick={() => setExpandedItem(isExpanded ? null : check.itemId)}
                className="w-full flex items-center gap-3 p-3 text-left"
              >
                <div className="w-10 h-10 rounded-sm overflow-hidden bg-vintage-tan/20 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-vintage-brown truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {checkItems.map(({ key, label, icon: Icon }) => (
                      <span
                        key={key}
                        className={cn(
                          'inline-flex items-center gap-0.5 text-[9px]',
                          check[key] === 'damaged' ? 'text-vintage-crimson' : 'text-emerald-600'
                        )}
                      >
                        <Icon className="w-2.5 h-2.5" />
                        {label}
                      </span>
                    ))}
                  </div>
                  {itemDamaged && assessment.level !== 'mild' && (
                    <div className="mt-1">
                      <span className={cn(
                        'text-[9px] px-1.5 py-0.5 rounded-sm border font-medium',
                        getDamageLevelColor(assessment.level)
                      )}>
                        {getDamageLevelLabel(assessment.level)}损伤
                      </span>
                    </div>
                  )}
                </div>
                {itemDamaged && (
                  <span className="w-2 h-2 rounded-full bg-vintage-crimson flex-shrink-0" />
                )}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-vintage-muted flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-vintage-muted flex-shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 space-y-3 animate-slideDown border-t border-vintage-border/10">
                  <div>
                    <h4 className="text-[11px] font-medium text-vintage-brown mb-1.5">检查项目</h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {checkItems.map(({ key, label, icon: Icon }) => (
                        <div key={key} className="flex items-center justify-between p-1.5 bg-vintage-cream/30 rounded-sm">
                          <span className="flex items-center gap-1 text-[10px] text-vintage-brown">
                            <Icon className="w-3 h-3 text-vintage-gold" />
                            {label}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => updateCheck(check.itemId, key, 'ok')}
                              className={cn(
                                'px-2 py-0.5 text-[10px] rounded-sm border transition-all',
                                check[key] === 'ok'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'border-vintage-border text-vintage-muted hover:border-emerald-200'
                              )}
                            >
                              正常
                            </button>
                            <button
                              onClick={() => updateCheck(check.itemId, key, 'damaged')}
                              className={cn(
                                'px-2 py-0.5 text-[10px] rounded-sm border transition-all',
                                check[key] === 'damaged'
                                  ? 'bg-vintage-crimson/10 text-vintage-crimson border-vintage-crimson/30'
                                  : 'border-vintage-border text-vintage-muted hover:border-vintage-crimson/30'
                              )}
                            >
                              异常
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-[11px] font-medium text-vintage-brown flex items-center gap-1">
                        <Camera className="w-3 h-3 text-vintage-gold" />
                        归还照片记录
                      </h4>
                      <button
                        onClick={() => addPhoto(check.itemId)}
                        className="text-[10px] text-vintage-brown border border-vintage-border/40 px-2 py-0.5 rounded-sm hover:border-vintage-brown/40 transition-colors"
                      >
                        + 添加照片
                      </button>
                    </div>
                    {(check.photos?.length || 0) > 0 ? (
                      <div className="flex gap-1.5 flex-wrap">
                        {check.photos?.map((photo) => (
                          <div key={photo.id} className="relative">
                            <div className="w-14 h-14 rounded-sm overflow-hidden bg-vintage-tan/20 border border-vintage-border/30">
                              <img src={photo.url} alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className="absolute -top-1 -right-1 bg-vintage-brown text-vintage-cream text-[8px] px-1 rounded">
                              归还
                            </span>
                          </div>
                        ))}
                        <button
                          onClick={() => setShowImages(showImages === check.itemId ? null : check.itemId)}
                          className="w-14 h-14 rounded-sm border-2 border-dashed border-vintage-border/50 flex flex-col items-center justify-center text-vintage-muted hover:border-vintage-brown/50 hover:text-vintage-brown transition-colors"
                        >
                          <Images className="w-4 h-4" />
                          <span className="text-[8px] mt-0.5">对比</span>
                        </button>
                      </div>
                    ) : (
                      <p className="text-[10px] text-vintage-muted bg-vintage-cream/30 rounded-sm p-2 text-center">
                        暂无照片，建议拍摄损伤细节留证
                      </p>
                    )}
                  </div>

                  {showImages === check.itemId && (
                    <div className="bg-vintage-cream/50 rounded-sm p-2 border border-vintage-border/30 animate-fadeIn">
                      <h5 className="text-[10px] font-medium text-vintage-brown mb-2 flex items-center gap-1">
                        <Images className="w-3 h-3 text-vintage-gold" />
                        租出前 vs 归还时 对比
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-[9px] text-vintage-muted mb-1 text-center">租出前</p>
                          <div className="aspect-[3/4] rounded-sm overflow-hidden bg-vintage-tan/20">
                            <img src={item.image} alt="租出前" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-vintage-muted mb-1 text-center">归还时</p>
                          {(check.photos?.length || 0) > 0 ? (
                            <div className="aspect-[3/4] rounded-sm overflow-hidden bg-vintage-tan/20">
                              <img src={check.photos![0].url} alt="归还时" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="aspect-[3/4] rounded-sm bg-vintage-tan/10 flex items-center justify-center text-vintage-muted/60 text-[9px]">
                              暂无照片
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {itemDamaged && (
                    <div className={cn(
                      'rounded-sm p-2 border',
                      getDamageLevelColor(assessment.level)
                    )}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">
                          {getDamageLevelLabel(assessment.level)}损伤评估
                        </span>
                      </div>
                      <p className="text-[10px] opacity-80 mb-1.5">{assessment.description}</p>
                      <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                        {assessment.cleaningFee && (
                          <div className="text-center bg-white/50 rounded-sm py-1">
                            <p className="opacity-70">清洗费</p>
                            <p className="font-bold">¥{assessment.cleaningFee}</p>
                          </div>
                        )}
                        {assessment.repairFee && (
                          <div className="text-center bg-white/50 rounded-sm py-1">
                            <p className="opacity-70">维修费</p>
                            <p className="font-bold">¥{assessment.repairFee}</p>
                          </div>
                        )}
                        {assessment.depositDeduction && (
                          <div className="text-center bg-white/50 rounded-sm py-1">
                            <p className="opacity-70">押金扣减</p>
                            <p className="font-bold">¥{assessment.depositDeduction}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-[11px] font-medium text-vintage-brown mb-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-vintage-gold" />
                      店员备注
                    </h4>
                    <textarea
                      value={check.notes}
                      onChange={(e) => updateCheck(check.itemId, 'notes', e.target.value)}
                      placeholder="详细描述损伤位置、程度、是否原有瑕疵等..."
                      className="w-full p-2 text-xs border border-vintage-border/30 rounded-sm bg-vintage-cream/30 text-vintage-brown placeholder:text-vintage-muted/50 resize-none h-16"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setShowDisputeDialog(check.itemId)
                      setDisputeNote('')
                    }}
                    className="w-full py-1.5 text-[10px] text-vintage-muted border border-vintage-border/30 rounded-sm hover:border-vintage-crimson/40 hover:text-vintage-crimson transition-colors"
                  >
                    顾客提出异议？记录申诉
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button
        onClick={() => onSave(order.id, checks)}
        className="w-full py-2.5 bg-vintage-brown text-vintage-cream text-sm font-medium rounded hover:bg-vintage-brown/90 transition-colors active:scale-[0.98]"
      >
        保存检查结果
      </button>

      {showDisputeDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fadeIn">
          <div className="bg-white rounded shadow-xl w-full max-w-sm overflow-hidden animate-fadeInUp">
            <div className="p-4 border-b border-vintage-border/20">
              <h3 className="text-sm font-display text-vintage-brown">记录顾客异议</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-vintage-cream/50 rounded-sm p-2">
                <p className="text-[10px] text-vintage-muted">对比查看</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {(() => {
                    const check = checks.find((c) => c.itemId === showDisputeDialog)
                    const item = vintageItems.find((i) => i.id === showDisputeDialog)
                    return (
                      <>
                        <div>
                          <p className="text-[9px] text-vintage-muted mb-0.5 text-center">租出前</p>
                          <div className="aspect-[3/4] rounded-sm overflow-hidden bg-vintage-tan/20">
                            <img src={item?.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-vintage-muted mb-0.5 text-center">归还时</p>
                          {(check?.photos?.length || 0) > 0 ? (
                            <div className="aspect-[3/4] rounded-sm overflow-hidden bg-vintage-tan/20">
                              <img src={check!.photos![0].url} alt="" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="aspect-[3/4] rounded-sm bg-vintage-tan/10 flex items-center justify-center text-vintage-muted/60 text-[9px]">
                              暂无
                            </div>
                          )}
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
              <div>
                <label className="text-[11px] text-vintage-brown font-medium block mb-1">顾客申诉</label>
                <textarea
                  value={disputeNote}
                  onChange={(e) => setDisputeNote(e.target.value)}
                  placeholder="请记录顾客的异议内容..."
                  rows={3}
                  className="w-full p-2 text-xs border border-vintage-border/30 rounded-sm bg-vintage-cream/30 text-vintage-brown placeholder:text-vintage-muted/50 resize-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-vintage-brown font-medium block mb-1">店员备注</label>
                <textarea
                  placeholder="说明损伤判定依据..."
                  rows={2}
                  className="w-full p-2 text-xs border border-vintage-border/30 rounded-sm bg-vintage-cream/30 text-vintage-brown placeholder:text-vintage-muted/50 resize-none"
                />
              </div>
            </div>
            <div className="p-4 border-t border-vintage-border/20 flex gap-2">
              <button
                onClick={() => setShowDisputeDialog(null)}
                className="flex-1 py-2 text-xs border border-vintage-border/40 text-vintage-muted rounded-sm hover:border-vintage-brown/40 hover:text-vintage-brown transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowDisputeDialog(null)
                  setDisputeNote('')
                }}
                className="flex-1 py-2 text-xs rounded-sm font-medium bg-vintage-brown text-vintage-cream hover:bg-vintage-brown/90 transition-colors flex items-center justify-center gap-1"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                提交申诉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

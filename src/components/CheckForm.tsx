import { useState } from 'react'
import { ChevronDown, ChevronUp, Droplets, Shirt, Link2, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RentalOrder, ReturnCheckItem, CheckStatus } from '@/types'
import { vintageItems } from '@/data/mock'

interface CheckFormProps {
  order: RentalOrder
  onSave: (orderId: string, checks: ReturnCheckItem[]) => void
}

const checkItems = [
  { key: 'stains' as const, label: '污渍', icon: Droplets },
  { key: 'missingButtons' as const, label: '缺扣', icon: Shirt },
  { key: 'zipperIssue' as const, label: '拉链', icon: Link2 },
  { key: 'liningIssue' as const, label: '内衬', icon: Layers }
] as const

export default function CheckForm({ order, onSave }: CheckFormProps) {
  const [checks, setChecks] = useState<ReturnCheckItem[]>(
    order.itemIds.map((itemId) => ({
      itemId,
      stains: 'ok' as CheckStatus,
      missingButtons: 'ok' as CheckStatus,
      zipperIssue: 'ok' as CheckStatus,
      liningIssue: 'ok' as CheckStatus,
      notes: ''
    }))
  )
  const [expandedItem, setExpandedItem] = useState<string | null>(order.itemIds[0] || null)

  const updateCheck = (itemId: string, field: keyof ReturnCheckItem, value: string | CheckStatus) => {
    setChecks((prev) =>
      prev.map((c) => (c.itemId === itemId ? { ...c, [field]: value } : c))
    )
  }

  const hasDamage = checks.some((c) =>
    c.stains === 'damaged' || c.missingButtons === 'damaged' ||
    c.zipperIssue === 'damaged' || c.liningIssue === 'damaged'
  )

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

      <div className="space-y-2">
        {checks.map((check) => {
          const item = vintageItems.find((i) => i.id === check.itemId)
          if (!item) return null
          const isExpanded = expandedItem === check.itemId
          const itemDamaged = check.stains === 'damaged' || check.missingButtons === 'damaged' ||
            check.zipperIssue === 'damaged' || check.liningIssue === 'damaged'

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
                <div className="px-3 pb-3 space-y-2 animate-slideDown border-t border-vintage-border/10">
                  {checkItems.map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-vintage-brown">
                        <Icon className="w-3.5 h-3.5 text-vintage-gold" />
                        {label}
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => updateCheck(check.itemId, key, 'ok')}
                          className={cn(
                            'px-3 py-1 text-[11px] rounded-sm border transition-all',
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
                            'px-3 py-1 text-[11px] rounded-sm border transition-all',
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

                  <div className="pt-1">
                    <textarea
                      value={check.notes}
                      onChange={(e) => updateCheck(check.itemId, 'notes', e.target.value)}
                      placeholder="备注损伤详情..."
                      className="w-full p-2 text-xs border border-vintage-border/30 rounded-sm bg-vintage-cream/30 text-vintage-brown placeholder:text-vintage-muted/50 resize-none h-16"
                    />
                  </div>
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
    </div>
  )
}

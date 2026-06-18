import { useState } from 'react'
import { Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RentalOrder, ReturnCheckItem } from '@/types'
import { vintageItems, outfitSets } from '@/data/mock'
import { useStore } from '@/store'
import CheckForm from '@/components/CheckForm'

const statusConfig = {
  active: { label: '租赁中', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  overdue: { label: '已逾期', bg: 'bg-vintage-crimson/10', text: 'text-vintage-crimson', border: 'border-vintage-crimson/20' },
  returned: { label: '已归还', bg: 'bg-vintage-tan/10', text: 'text-vintage-muted', border: 'border-vintage-border/20' },
  renewal_requested: { label: '续租待审', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }
}

export default function ReturnsPage() {
  const { rentalOrders, updateReturnCheck, handleRenewal } = useStore()
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [savedOrderId, setSavedOrderId] = useState<string | null>(null)

  const activeOrders = rentalOrders.filter((o) => o.status !== 'returned')
  const completedOrders = rentalOrders.filter((o) => o.status === 'returned')

  const handleSaveCheck = (orderId: string, checks: ReturnCheckItem[]) => {
    updateReturnCheck(orderId, checks)
    setSavedOrderId(orderId)
    setTimeout(() => setSavedOrderId(null), 3000)
  }

  const daysOverdue = (endDate: string) => {
    const diff = Math.ceil((new Date().getTime() - new Date(endDate).getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  const daysUntilReturn = (endDate: string) => {
    const diff = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const renderOrderCard = (order: RentalOrder) => {
    const config = statusConfig[order.status]
    const outfit = outfitSets.find((o) => o.id === order.outfitId)
    const items = order.itemIds.map((id) => vintageItems.find((i) => i.id === id)).filter(Boolean)
    const isSelected = selectedOrderId === order.id
    const overdue = order.status === 'overdue' ? daysOverdue(order.endDate) : 0
    const untilReturn = order.status === 'active' ? daysUntilReturn(order.endDate) : null

    return (
      <div
        key={order.id}
        className={cn(
          'bg-white rounded shadow-sm border overflow-hidden transition-all duration-200',
          isSelected ? 'border-vintage-brown shadow-md' : 'border-vintage-border/20 hover:border-vintage-brown/30'
        )}
      >
        <button
          onClick={() => setSelectedOrderId(isSelected ? null : order.id)}
          className="w-full p-3 text-left"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex -space-x-2 flex-shrink-0">
                {items.slice(0, 3).map((item) =>
                  item ? (
                    <div key={item.id} className="w-8 h-8 rounded-sm overflow-hidden border border-white bg-vintage-tan/20">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : null
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-vintage-brown truncate">
                  {order.customerName}
                </p>
                <p className="text-[10px] text-vintage-muted truncate">
                  {outfit?.name || '套装'}
                </p>
              </div>
            </div>
            <span className={cn('text-[10px] px-2 py-0.5 rounded-sm border flex-shrink-0', config.bg, config.text, config.border)}>
              {config.label}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-2 text-[10px] text-vintage-muted">
            <span>{order.startDate} → {order.endDate}</span>
            {overdue > 0 && (
              <span className="text-vintage-crimson font-medium">逾期 {overdue} 天</span>
            )}
            {untilReturn !== null && untilReturn >= 0 && (
              <span className={untilReturn <= 2 ? 'text-amber-600 font-medium' : ''}>
                剩余 {untilReturn} 天
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-vintage-crimson font-medium">押金 ¥{order.totalDeposit}</span>
            <ArrowRight className={cn(
              'w-3.5 h-3.5 text-vintage-muted transition-transform',
              isSelected && 'rotate-90'
            )} />
          </div>
        </button>

        {isSelected && (
          <div className="px-3 pb-3 space-y-3 animate-slideDown border-t border-vintage-border/10 pt-3">
            {order.renewalRequest && order.renewalRequest.requested && order.renewalRequest.status === 'pending' && (
              <div className="bg-amber-50 border border-amber-200 rounded-sm p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-medium text-amber-700">续租请求</span>
                </div>
                <p className="text-[11px] text-amber-600 mb-2">
                  顾客申请续租至 {order.renewalRequest.newEndDate}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRenewal(order.id, true)}
                    className="flex items-center gap-1 px-3 py-1.5 text-[11px] bg-emerald-600 text-white rounded-sm hover:bg-emerald-700 transition-colors"
                  >
                    <CheckCircle className="w-3 h-3" />
                    批准续租
                  </button>
                  <button
                    onClick={() => handleRenewal(order.id, false)}
                    className="flex items-center gap-1 px-3 py-1.5 text-[11px] bg-vintage-crimson text-white rounded-sm hover:bg-vintage-crimson/90 transition-colors"
                  >
                    <XCircle className="w-3 h-3" />
                    拒绝
                  </button>
                </div>
              </div>
            )}

            {order.returnCheck ? (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-vintage-brown">已记录的检查结果</h4>
                {order.returnCheck.map((rc) => {
                  const item = vintageItems.find((i) => i.id === rc.itemId)
                  if (!item) return null
                  return (
                    <div key={rc.itemId} className="bg-vintage-cream/50 rounded-sm p-2 text-[11px]">
                      <p className="font-medium text-vintage-brown">{item.name}</p>
                      <div className="flex flex-wrap gap-2 mt-1 text-[10px]">
                        <span className={rc.stains === 'damaged' ? 'text-vintage-crimson' : 'text-emerald-600'}>
                          污渍: {rc.stains === 'ok' ? '正常' : '异常'}
                        </span>
                        <span className={rc.missingButtons === 'damaged' ? 'text-vintage-crimson' : 'text-emerald-600'}>
                          缺扣: {rc.missingButtons === 'ok' ? '正常' : '异常'}
                        </span>
                        <span className={rc.zipperIssue === 'damaged' ? 'text-vintage-crimson' : 'text-emerald-600'}>
                          拉链: {rc.zipperIssue === 'ok' ? '正常' : '异常'}
                        </span>
                        <span className={rc.liningIssue === 'damaged' ? 'text-vintage-crimson' : 'text-emerald-600'}>
                          内衬: {rc.liningIssue === 'ok' ? '正常' : '异常'}
                        </span>
                      </div>
                      {rc.notes && <p className="text-vintage-muted mt-1">备注: {rc.notes}</p>}
                    </div>
                  )
                })}
              </div>
            ) : (
              <CheckForm order={order} onSave={handleSaveCheck} />
            )}

            {savedOrderId === order.id && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-2 text-center animate-fadeIn">
                <p className="text-[11px] text-emerald-700 font-medium">检查结果已保存</p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vintage-cream">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="mb-4">
          <h1 className="font-display text-lg text-vintage-brown">归还检查</h1>
          <p className="text-xs text-vintage-muted mt-0.5">
            {activeOrders.length} 个进行中的订单 · {completedOrders.length} 个已完成
          </p>
        </div>

        <div className="space-y-2">
          {activeOrders.length > 0 && (
            <div>
              <h2 className="text-xs font-medium text-vintage-muted uppercase tracking-wider mb-2">
                进行中
              </h2>
              <div className="space-y-2">
                {activeOrders.map(renderOrderCard)}
              </div>
            </div>
          )}

          {completedOrders.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xs font-medium text-vintage-muted uppercase tracking-wider mb-2">
                已归还
              </h2>
              <div className="space-y-2 opacity-70">
                {completedOrders.map(renderOrderCard)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

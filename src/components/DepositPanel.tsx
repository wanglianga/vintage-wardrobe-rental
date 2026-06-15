import { AlertTriangle, Shield, Coins, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { VintageItem } from '@/types'

interface DepositPanelProps {
  items: VintageItem[]
  totalDeposit: number
  rentalDays: number
  className?: string
}

export default function DepositPanel({ items, totalDeposit, rentalDays, className }: DepositPanelProps) {
  const dailyRate = rentalDays > 0 ? Math.round(totalDeposit * 0.08) : 0
  const totalRental = dailyRate * rentalDays

  return (
    <div className={cn('bg-white rounded shadow-sm border border-vintage-border/30', className)}>
      <div className="p-3 border-b border-vintage-border/20">
        <h3 className="flex items-center gap-2 text-sm font-display text-vintage-brown">
          <Coins className="w-4 h-4 text-vintage-gold" />
          押金与费用
        </h3>
      </div>

      <div className="p-3 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-xs">
            <span className="text-vintage-brown truncate mr-2">{item.name}</span>
            <span className="text-vintage-crimson font-medium flex-shrink-0">
              ¥{item.deposit}
            </span>
          </div>
        ))}

        <div className="border-t border-vintage-border/20 pt-2 mt-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-vintage-brown">总押金</span>
            <span className="text-vintage-crimson text-base">¥{totalDeposit}</span>
          </div>
          {rentalDays > 0 && (
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-vintage-muted">日租金（押金8%/天）</span>
              <span className="text-vintage-brown">¥{dailyRate}/天</span>
            </div>
          )}
          {totalRental > 0 && (
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-vintage-muted">租赁费用（{rentalDays}天）</span>
              <span className="text-vintage-brown font-medium">¥{totalRental}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 bg-vintage-cream/30 border-t border-vintage-border/20 space-y-2">
        <h4 className="flex items-center gap-1.5 text-[11px] font-medium text-vintage-brown">
          <Shield className="w-3 h-3 text-vintage-gold" />
          押金退还规则
        </h4>
        <ul className="space-y-1 text-[10px] text-vintage-muted">
          <li className="flex items-start gap-1.5">
            <span className="text-emerald-600 mt-0.5">●</span>
            归还时物品无新增损伤，押金全额退还
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-500 mt-0.5">●</span>
            轻微污渍可清洗者，扣除清洗费 ¥100-300
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-orange-500 mt-0.5">●</span>
            缺扣、拉链损坏需维修者，扣除维修费 ¥200-500
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-red-600 mt-0.5">●</span>
            严重损伤无法修复者，扣押金30%-100%
          </li>
        </ul>

        <h4 className="flex items-center gap-1.5 text-[11px] font-medium text-vintage-brown pt-1">
          <AlertTriangle className="w-3 h-3 text-vintage-crimson" />
          逾期归还
        </h4>
        <p className="text-[10px] text-vintage-muted">
          逾期每日加收日租金的150%作为滞纳金，超过3天未还将启动押金扣减
        </p>

        <h4 className="flex items-center gap-1.5 text-[11px] font-medium text-vintage-brown pt-1">
          <FileText className="w-3 h-3 text-vintage-gold" />
          续租说明
        </h4>
        <p className="text-[10px] text-vintage-muted">
          续租需在归还日前1天提出，经店员确认物品状态后可续租，续租押金按日计算
        </p>
      </div>
    </div>
  )
}

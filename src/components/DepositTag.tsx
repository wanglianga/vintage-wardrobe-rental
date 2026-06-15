import { cn } from '@/lib/utils'
import { Coins } from 'lucide-react'

interface DepositTagProps {
  amount: number
  size?: 'sm' | 'md'
  className?: string
}

export default function DepositTag({ amount, size = 'sm', className }: DepositTagProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 font-medium',
        size === 'sm' ? 'text-xs' : 'text-sm',
        'text-vintage-crimson',
        className
      )}
    >
      <Coins className={cn(size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5')} />
      <span>押金 ¥{amount}</span>
    </div>
  )
}

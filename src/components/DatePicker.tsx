import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  startDate: string | null
  endDate: string | null
  onStartChange: (date: string) => void
  onEndChange: (date: string) => void
  returnDate?: string | null
  occupiedDates?: string[]
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

export default function DatePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  returnDate,
  occupiedDates = []
}: DatePickerProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const startObj = startDate ? new Date(startDate) : null
  const endObj = endDate ? new Date(endDate) : null

  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }, [startDate, endDate])

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const handleDayClick = (day: number) => {
    const dateStr = formatDate(viewYear, viewMonth, day)
    const dateObj = new Date(dateStr)
    const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate())
    if (dateObj < new Date(todayStr)) return
    if (occupiedDates.includes(dateStr)) return

    if (!startDate || (startDate && endDate)) {
      onStartChange(dateStr)
      onEndChange('')
    } else {
      if (dateStr <= startDate) {
        onStartChange(dateStr)
        onEndChange('')
      } else {
        onEndChange(dateStr)
      }
    }
  }

  const isInRange = (day: number) => {
    const dateStr = formatDate(viewYear, viewMonth, day)
    if (!startObj || !endObj) return false
    const d = new Date(dateStr)
    return d > startObj && d < endObj
  }

  const isStart = (day: number) => {
    if (!startDate) return false
    return formatDate(viewYear, viewMonth, day) === startDate
  }

  const isEnd = (day: number) => {
    if (!endDate) return false
    return formatDate(viewYear, viewMonth, day) === endDate
  }

  const isReturn = (day: number) => {
    if (!returnDate) return false
    return formatDate(viewYear, viewMonth, day) === returnDate
  }

  const isPast = (day: number) => {
    const dateStr = formatDate(viewYear, viewMonth, day)
    const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate())
    return dateStr < todayStr
  }

  const isOccupied = (day: number) => {
    const dateStr = formatDate(viewYear, viewMonth, day)
    return occupiedDates.includes(dateStr)
  }

  return (
    <div className="bg-white rounded shadow-sm border border-vintage-border/30 p-3">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1 hover:bg-vintage-tan/20 rounded">
          <ChevronLeft className="w-4 h-4 text-vintage-brown" />
        </button>
        <span className="text-sm font-display text-vintage-brown">
          {viewYear}年{viewMonth + 1}月
        </span>
        <button onClick={nextMonth} className="p-1 hover:bg-vintage-tan/20 rounded">
          <ChevronRight className="w-4 h-4 text-vintage-brown" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[10px] text-vintage-muted py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const past = isPast(day)
          const start = isStart(day)
          const end = isEnd(day)
          const range = isInRange(day)
          const ret = isReturn(day)
          const occupied = isOccupied(day)
          const disabled = past || occupied

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={disabled}
              className={cn(
                'relative w-full aspect-square flex items-center justify-center text-[11px] rounded-sm transition-all',
                past && 'text-vintage-border/50 cursor-not-allowed',
                occupied && !start && !end && !past && 'bg-vintage-crimson/20 text-vintage-crimson/60 cursor-not-allowed line-through',
                !disabled && !start && !end && !range && !ret && 'text-vintage-brown hover:bg-vintage-tan/20',
                start && 'bg-vintage-brown text-vintage-cream font-medium',
                end && 'bg-vintage-crimson text-white font-medium',
                range && 'bg-vintage-gold/15 text-vintage-brown',
                ret && !start && !end && !occupied && 'ring-2 ring-vintage-crimson/50 text-vintage-crimson font-medium'
              )}
            >
              {day}
              {occupied && !start && !end && !past && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-vintage-crimson" />
              )}
              {ret && !start && !end && !occupied && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-vintage-crimson" />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-3 flex items-center gap-3 flex-wrap text-[10px] text-vintage-muted">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-vintage-brown" /> 起租日
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-vintage-crimson" /> 归还日
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-vintage-gold/30" /> 租期内
        </span>
        {occupiedDates.length > 0 && (
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-vintage-crimson/20" /> 已占用
          </span>
        )}
      </div>

      {startDate && endDate && rentalDays > 0 && (
        <div className="mt-2 p-2 bg-vintage-cream/50 rounded-sm text-center">
          <span className="text-xs text-vintage-brown">
            租期 <strong className="text-vintage-crimson">{rentalDays}</strong> 天
          </span>
          <span className="text-[10px] text-vintage-muted ml-2">
            {startDate} → {endDate}
          </span>
        </div>
      )}
    </div>
  )
}

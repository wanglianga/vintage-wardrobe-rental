import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { VintageItem, OutfitConflict, ReturnCheckItem, DamageAssessment, DamageLevel, DateRange, ItemDetailedAvailability, ItemStatus, StyleAlternative, OutfitConsistencyResult } from '@/types'
import { vintageItems } from '@/data/mock'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isDateRangeOverlapping(range1: DateRange, range2: DateRange): boolean {
  const start1 = new Date(range1.start)
  const end1 = new Date(range1.end)
  const start2 = new Date(range2.start)
  const end2 = new Date(range2.end)
  return start1 <= end2 && start2 <= end1
}

export function getItemAvailability(item: VintageItem, startDate: string, endDate: string): { available: boolean; conflictingPeriods: DateRange[] } {
  const requestedRange: DateRange = { start: startDate, end: endDate }
  const conflictingPeriods: DateRange[] = []

  for (const period of item.occupiedPeriods) {
    if (isDateRangeOverlapping(requestedRange, period)) {
      conflictingPeriods.push(period)
    }
  }

  return {
    available: conflictingPeriods.length === 0,
    conflictingPeriods
  }
}

export function checkItemAvailabilityForSet(
  items: VintageItem[],
  startDate: string | null,
  endDate: string | null
): { availableItems: VintageItem[]; unavailableItems: { item: VintageItem; conflictingPeriods: DateRange[] }[] } {
  if (!startDate || !endDate) {
    return { availableItems: items, unavailableItems: [] }
  }

  const availableItems: VintageItem[] = []
  const unavailableItems: { item: VintageItem; conflictingPeriods: DateRange[] }[] = []

  for (const item of items) {
    const availability = getItemAvailability(item, startDate, endDate)
    if (availability.available) {
      availableItems.push(item)
    } else {
      unavailableItems.push({ item, conflictingPeriods: availability.conflictingPeriods })
    }
  }

  return { availableItems, unavailableItems }
}

const sizeGroups: Record<string, string[]> = {
  XS: ['XS', 'S'],
  S: ['XS', 'S', 'M'],
  M: ['S', 'M', 'L'],
  L: ['M', 'L', 'XL'],
  XL: ['L', 'XL']
}

export function checkOutfitConflicts(items: VintageItem[], startDate?: string | null, endDate?: string | null): OutfitConflict[] {
  const conflicts: OutfitConflict[] = []

  if (items.length < 2) {
    if (startDate && endDate && items.length === 1) {
      const availability = getItemAvailability(items[0], startDate, endDate)
      if (!availability.available) {
        const period = availability.conflictingPeriods[0]
        conflicts.push({
          type: 'rental_period',
          severity: 'error',
          message: `「${items[0].name}」在 ${startDate} 至 ${endDate} 期间不可租赁（已被预约：${period.start} 至 ${period.end}）`,
          affectedItems: [items[0].id, '']
        })
      }
    }
    return conflicts
  }

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const itemA = items[i]
      const itemB = items[j]

      if (itemA.size !== 'ONE SIZE' && itemB.size !== 'ONE SIZE') {
        const compatibleSizes = sizeGroups[itemA.size] || []
        if (!compatibleSizes.includes(itemB.size)) {
          conflicts.push({
            type: 'size',
            severity: 'warning',
            message: `「${itemA.name}」(${itemA.size}) 与「${itemB.name}」(${itemB.size}) 尺码可能不匹配`,
            affectedItems: [itemA.id, itemB.id]
          })
        }
      }

      if (itemA.era !== itemB.era) {
        const eraA = parseInt(itemA.era)
        const eraB = parseInt(itemB.era)
        if (Math.abs(eraA - eraB) >= 20) {
          conflicts.push({
            type: 'era',
            severity: 'warning',
            message: `「${itemA.name}」(${itemA.era}) 与「${itemB.name}」(${itemB.era}) 年代跨度较大，风格可能不协调`,
            affectedItems: [itemA.id, itemB.id]
          })
        }
      }

      if (itemA.color && itemB.color) {
        const warmColors = ['驼色', '棕色', '深棕', '酒红', '大地色系', '米白', '奶白', '藤编原色']
        const coolColors = ['牛仔蓝', '靛蓝', '藏青', '米白印花']
        const aWarm = warmColors.some(c => itemA.color?.includes(c))
        const bWarm = warmColors.some(c => itemB.color?.includes(c))
        const aCool = coolColors.some(c => itemA.color?.includes(c))
        const bCool = coolColors.some(c => itemB.color?.includes(c))
        if ((aWarm && bCool) || (aCool && bWarm)) {
          if (!itemA.color.includes('米白') && !itemB.color.includes('米白')) {
            conflicts.push({
              type: 'color',
              severity: 'warning',
              message: `「${itemA.name}」(${itemA.color}) 与「${itemB.name}」(${itemB.color}) 色调可能不协调`,
              affectedItems: [itemA.id, itemB.id]
            })
          }
        }
      }
    }
  }

  if (startDate && endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (end < start) {
      conflicts.push({
        type: 'rental_period',
        severity: 'error',
        message: '归还日期不能早于起租日期',
        affectedItems: ['', '']
      })
    } else {
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      if (days < 3) {
        conflicts.push({
          type: 'rental_period',
          severity: 'warning',
          message: '租期建议不少于3天',
          affectedItems: ['', '']
        })
      }

      const { unavailableItems } = checkItemAvailabilityForSet(items, startDate, endDate)
      for (const { item, conflictingPeriods } of unavailableItems) {
        const periodStr = conflictingPeriods
          .map(p => `${p.start} 至 ${p.end}`)
          .join('、')
        conflicts.push({
          type: 'rental_period',
          severity: 'error',
          message: `「${item.name}」在 ${startDate} 至 ${endDate} 期间不可租赁（已被预约：${periodStr}），建议拆开单品分别预约或选择其他日期`,
          affectedItems: [item.id, '']
        })
      }
    }
  }

  return conflicts
}

export function calculateMergedDeposit(items: VintageItem[]): { total: number; discount: number; final: number; breakdown: { id: string; name: string; deposit: number }[] } {
  const breakdown = items.map(item => ({
    id: item.id,
    name: item.name,
    deposit: item.deposit
  }))
  const total = breakdown.reduce((sum, b) => sum + b.deposit, 0)
  const discount = items.length >= 3 ? Math.round(total * 0.1) : items.length === 2 ? Math.round(total * 0.05) : 0
  const final = total - discount
  return { total, discount, final, breakdown }
}

export function assessDamage(check: ReturnCheckItem, deposit: number): DamageAssessment {
  const damagedFields: string[] = []
  if (check.stains === 'damaged') damagedFields.push('stains')
  if (check.missingButtons === 'damaged') damagedFields.push('missingButtons')
  if (check.zipperIssue === 'damaged') damagedFields.push('zipperIssue')
  if (check.liningIssue === 'damaged') damagedFields.push('liningIssue')
  if (check.odor === 'damaged') damagedFields.push('odor')
  if (check.tear === 'damaged') damagedFields.push('tear')

  const damageCount = damagedFields.length

  if (damageCount === 0) {
    return {
      level: 'mild' as DamageLevel,
      description: '状态良好，无明显损伤'
    }
  }

  let level: DamageLevel = 'mild'
  let cleaningFee = 0
  let repairFee = 0
  let depositDeduction = 0
  const descriptions: string[] = []

  if (check.stains === 'damaged') {
    cleaningFee += 150
    descriptions.push('有污渍需清洗')
  }
  if (check.odor === 'damaged') {
    cleaningFee += 100
    descriptions.push('有异味需除味处理')
  }
  if (check.missingButtons === 'damaged') {
    repairFee += 200
    descriptions.push('缺扣需补配')
  }
  if (check.zipperIssue === 'damaged') {
    repairFee += 300
    descriptions.push('拉链需维修')
  }
  if (check.liningIssue === 'damaged') {
    repairFee += 250
    descriptions.push('内衬需修补')
  }
  if (check.tear === 'damaged') {
    repairFee += 400
    descriptions.push('有破损需织补')
  }

  if (damageCount >= 3 || repairFee >= 500) {
    level = 'severe'
    depositDeduction = Math.round(deposit * 0.3)
    descriptions.push('损伤较多，建议扣除部分押金')
  } else if (damageCount >= 2 || (cleaningFee > 0 && repairFee > 0)) {
    level = 'moderate'
    descriptions.push('存在多处轻微损伤')
  }

  return {
    level,
    cleaningFee: cleaningFee || undefined,
    repairFee: repairFee || undefined,
    depositDeduction: depositDeduction || undefined,
    description: descriptions.join('；')
  }
}

export function getDamageLevelLabel(level: DamageLevel): string {
  const labels = {
    mild: '轻微',
    moderate: '中度',
    severe: '严重'
  }
  return labels[level]
}

export function getDamageLevelColor(level: DamageLevel): string {
  const colors = {
    mild: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    moderate: 'text-amber-600 bg-amber-50 border-amber-200',
    severe: 'text-vintage-crimson bg-vintage-crimson/10 border-vintage-crimson/30'
  }
  return colors[level]
}

export function getItemDetailedAvailability(
  item: VintageItem,
  startDate: string | null,
  endDate: string | null
): ItemDetailedAvailability {
  if (!startDate || !endDate) {
    return {
      status: 'available',
      available: true,
      conflictingPeriods: [],
      maintenancePeriods: [],
      message: '可租赁'
    }
  }

  const requestedRange: DateRange = { start: startDate, end: endDate }
  const conflictingPeriods: DateRange[] = []
  const maintenanceConflicts: DateRange[] = []

  for (const period of item.occupiedPeriods) {
    if (isDateRangeOverlapping(requestedRange, period)) {
      conflictingPeriods.push(period)
    }
  }

  if (item.maintenancePeriods) {
    for (const period of item.maintenancePeriods) {
      if (isDateRangeOverlapping(requestedRange, period)) {
        maintenanceConflicts.push(period)
      }
    }
  }

  if (maintenanceConflicts.length > 0) {
    const periodStr = maintenanceConflicts
      .map(p => `${p.start.slice(5)}~${p.end.slice(5)}`)
      .join('、')
    return {
      status: 'maintenance',
      available: false,
      conflictingPeriods,
      maintenancePeriods: maintenanceConflicts,
      message: `维修中（${periodStr}）`
    }
  }

  if (conflictingPeriods.length > 0) {
    const periodStr = conflictingPeriods
      .map(p => `${p.start.slice(5)}~${p.end.slice(5)}`)
      .join('、')
    return {
      status: 'rented',
      available: false,
      conflictingPeriods,
      maintenancePeriods: [],
      message: `已租出（${periodStr}）`
    }
  }

  return {
    status: 'available',
    available: true,
    conflictingPeriods: [],
    maintenancePeriods: [],
    message: '可租赁'
  }
}

export function getItemStatusLabel(status: ItemStatus): string {
  const labels: Record<ItemStatus, string> = {
    available: '可租',
    rented: '已租出',
    maintenance: '维修中'
  }
  return labels[status]
}

export function getItemStatusColor(status: ItemStatus): string {
  const colors: Record<ItemStatus, string> = {
    available: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    rented: 'bg-vintage-crimson/10 text-vintage-crimson border-vintage-crimson/20',
    maintenance: 'bg-amber-100 text-amber-700 border-amber-200'
  }
  return colors[status]
}

export function findSameStyleItems(item: VintageItem, allItems: VintageItem[] = vintageItems): VintageItem[] {
  if (!item.sameStyleGroupId) return []
  return allItems.filter(
    (i) => i.sameStyleGroupId === item.sameStyleGroupId && i.id !== item.id
  )
}

export function findSameStyleAvailableSizes(
  item: VintageItem,
  startDate: string | null,
  endDate: string | null,
  allItems: VintageItem[] = vintageItems
): VintageItem[] {
  const sameStyle = findSameStyleItems(item, allItems)
  if (!startDate || !endDate) return sameStyle
  return sameStyle.filter((i) => {
    const avail = getItemDetailedAvailability(i, startDate, endDate)
    return avail.available
  })
}

export function findStyleAlternatives(
  item: VintageItem,
  startDate: string | null,
  endDate: string | null,
  allItems: VintageItem[] = vintageItems,
  excludeIds: string[] = []
): StyleAlternative[] {
  const alternatives: StyleAlternative[] = []

  for (const candidate of allItems) {
    if (candidate.id === item.id) continue
    if (excludeIds.includes(candidate.id)) continue
    if (candidate.category !== item.category) continue

    if (startDate && endDate) {
      const avail = getItemDetailedAvailability(candidate, startDate, endDate)
      if (!avail.available) continue
    }

    let score = 0
    const reasons: string[] = []

    if (candidate.era === item.era) {
      score += 40
      reasons.push(`同年代（${item.era}）`)
    } else {
      const eraA = parseInt(item.era)
      const eraB = parseInt(candidate.era)
      if (Math.abs(eraA - eraB) <= 10) {
        score += 20
        reasons.push('年代相近')
      }
    }

    if (candidate.styleTags && item.styleTags) {
      const commonTags = candidate.styleTags.filter((t) => item.styleTags?.includes(t))
      if (commonTags.length > 0) {
        score += commonTags.length * 15
        reasons.push(`风格标签匹配：${commonTags.join('、')}`)
      }
    }

    if (score > 0) {
      alternatives.push({
        item: candidate,
        matchScore: score,
        matchReasons: reasons
      })
    }
  }

  alternatives.sort((a, b) => b.matchScore - a.matchScore)
  return alternatives.slice(0, 5)
}

export function evaluateOutfitConsistency(items: VintageItem[]): OutfitConsistencyResult {
  const sizeConflicts: string[] = []
  const styleConflicts: string[] = []
  const eraConflicts: string[] = []

  if (items.length < 2) {
    return {
      isConsistent: true,
      sizeConflicts: [],
      styleConflicts: [],
      eraConflicts: []
    }
  }

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const itemA = items[i]
      const itemB = items[j]

      if (itemA.size !== 'ONE SIZE' && itemB.size !== 'ONE SIZE') {
        const compatibleSizes = sizeGroups[itemA.size] || []
        if (!compatibleSizes.includes(itemB.size)) {
          sizeConflicts.push(
            `「${itemA.name}」(${itemA.size}) 与「${itemB.name}」(${itemB.size}) 尺码可能不匹配`
          )
        }
      }

      if (itemA.era !== itemB.era) {
        const eraA = parseInt(itemA.era)
        const eraB = parseInt(itemB.era)
        if (Math.abs(eraA - eraB) >= 20) {
          eraConflicts.push(
            `「${itemA.name}」(${itemA.era}) 与「${itemB.name}」(${itemB.era}) 年代跨度较大`
          )
        }
      }

      if (itemA.styleTags && itemB.styleTags) {
        const commonTags = itemA.styleTags.filter((t) => itemB.styleTags?.includes(t))
        if (commonTags.length === 0) {
          styleConflicts.push(
            `「${itemA.name}」与「${itemB.name}」风格标签无交集`
          )
        }
      }
    }
  }

  return {
    isConsistent: sizeConflicts.length === 0 && eraConflicts.length === 0,
    sizeConflicts,
    styleConflicts,
    eraConflicts
  }
}

export function getItemOccupiedDates(item: VintageItem): string[] {
  const dates: string[] = []
  const allPeriods = [...item.occupiedPeriods, ...(item.maintenancePeriods || [])]

  for (const period of allPeriods) {
    const start = new Date(period.start)
    const end = new Date(period.end)
    const current = new Date(start)
    while (current <= end) {
      const dateStr = formatDateStr(current)
      dates.push(dateStr)
      current.setDate(current.getDate() + 1)
    }
  }

  return dates
}

function formatDateStr(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getItemsCombinedOccupiedDates(items: VintageItem[]): string[] {
  const dateSet = new Set<string>()
  for (const item of items) {
    const dates = getItemOccupiedDates(item)
    dates.forEach((d) => dateSet.add(d))
  }
  return Array.from(dateSet)
}

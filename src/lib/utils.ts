import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { VintageItem, OutfitConflict, ReturnCheckItem, DamageAssessment, DamageLevel } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

  if (items.length < 2) return conflicts

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
    }
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    if (days < 3) {
      conflicts.push({
        type: 'rental_period',
        severity: 'warning',
        message: '租期建议不少于3天',
        affectedItems: ['', '']
      })
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

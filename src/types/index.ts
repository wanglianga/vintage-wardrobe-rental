export type Category = 'tops' | 'bottoms' | 'outerwear' | 'dress' | 'accessories' | 'shoes' | 'bags'
export type WearLevel = 1 | 2 | 3 | 4 | 5
export type OrderStatus = 'active' | 'overdue' | 'returned' | 'renewal_requested'
export type CheckStatus = 'ok' | 'damaged'
export type RenewalStatus = 'pending' | 'approved' | 'rejected'
export type Role = 'customer' | 'staff'
export type ConflictType = 'size' | 'color' | 'era' | 'rental_period'
export type DamageLevel = 'mild' | 'moderate' | 'severe'

export interface DateRange {
  start: string
  end: string
  orderId?: string
}

export interface VintageItem {
  id: string
  name: string
  category: Category
  era: string
  year: string
  size: string
  wearLevel: WearLevel
  deposit: number
  image: string
  description: string
  color?: string
  styleTags?: string[]
  occupiedPeriods: DateRange[]
  condition: {
    stains: boolean
    missingButtons: boolean
    zipperIssue: boolean
    liningIssue: boolean
  }
}

export interface OutfitConflict {
  type: ConflictType
  severity: 'warning' | 'error'
  message: string
  affectedItems: [string, string]
}

export interface OutfitBuilderState {
  selectedItems: string[]
  startDate: string | null
  endDate: string | null
}

export interface PhotoRecord {
  id: string
  url: string
  type: 'before' | 'after'
  timestamp: string
  note?: string
}

export interface OutfitSet {
  id: string
  name: string
  items: string[]
  totalDeposit: number
  description: string
  images: string[]
}

export interface DamageAssessment {
  level: DamageLevel
  cleaningFee?: number
  repairFee?: number
  depositDeduction?: number
  description: string
}

export interface ReturnCheckItem {
  itemId: string
  stains: CheckStatus
  missingButtons: CheckStatus
  zipperIssue: CheckStatus
  liningIssue: CheckStatus
  odor?: CheckStatus
  tear?: CheckStatus
  notes: string
  photos?: PhotoRecord[]
  assessment?: DamageAssessment
}

export interface ReturnDispute {
  orderId: string
  itemId: string
  customerNote: string
  staffNote: string
  photos: PhotoRecord[]
  status: 'pending' | 'resolved'
  resolution?: string
}

export interface RenewalRequest {
  requested: boolean
  newEndDate: string
  status: RenewalStatus
}

export interface RentalOrder {
  id: string
  customerName: string
  outfitId: string
  itemIds: string[]
  startDate: string
  endDate: string
  totalDeposit: number
  status: OrderStatus
  returnCheck?: ReturnCheckItem[]
  renewalRequest?: RenewalRequest
  disputes?: ReturnDispute[]
  beforePhotos?: PhotoRecord[]
}

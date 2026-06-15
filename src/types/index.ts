export type Category = 'tops' | 'bottoms' | 'outerwear' | 'dress' | 'accessories' | 'shoes'
export type WearLevel = 1 | 2 | 3 | 4 | 5
export type OrderStatus = 'active' | 'overdue' | 'returned' | 'renewal_requested'
export type CheckStatus = 'ok' | 'damaged'
export type RenewalStatus = 'pending' | 'approved' | 'rejected'
export type Role = 'customer' | 'staff'

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
  condition: {
    stains: boolean
    missingButtons: boolean
    zipperIssue: boolean
    liningIssue: boolean
  }
}

export interface OutfitSet {
  id: string
  name: string
  items: string[]
  totalDeposit: number
  description: string
  images: string[]
}

export interface ReturnCheckItem {
  itemId: string
  stains: CheckStatus
  missingButtons: CheckStatus
  zipperIssue: CheckStatus
  liningIssue: CheckStatus
  notes: string
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
}

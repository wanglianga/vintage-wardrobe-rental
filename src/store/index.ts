import { create } from 'zustand'
import type { Role, RentalOrder, ReturnCheckItem } from '@/types'
import { rentalOrders as initialOrders } from '@/data/mock'

interface StoreState {
  role: Role
  favorites: string[]
  rentalOrders: RentalOrder[]
  setRole: (role: Role) => void
  toggleFavorite: (outfitId: string) => void
  addRentalOrder: (order: RentalOrder) => void
  updateReturnCheck: (orderId: string, checks: ReturnCheckItem[]) => void
  handleRenewal: (orderId: string, approved: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  role: 'customer',
  favorites: [],
  rentalOrders: initialOrders,
  setRole: (role) => set({ role }),
  toggleFavorite: (outfitId) =>
    set((state) => ({
      favorites: state.favorites.includes(outfitId)
        ? state.favorites.filter((id) => id !== outfitId)
        : [...state.favorites, outfitId]
    })),
  addRentalOrder: (order) =>
    set((state) => ({
      rentalOrders: [...state.rentalOrders, order]
    })),
  updateReturnCheck: (orderId, checks) =>
    set((state) => ({
      rentalOrders: state.rentalOrders.map((order) =>
        order.id === orderId ? { ...order, returnCheck: checks } : order
      )
    })),
  handleRenewal: (orderId, approved) =>
    set((state) => ({
      rentalOrders: state.rentalOrders.map((order) => {
        if (order.id !== orderId) return order
        if (!order.renewalRequest) return order
        return {
          ...order,
          status: approved ? 'active' : order.status === 'renewal_requested' ? 'active' : order.status,
          endDate: approved ? order.renewalRequest.newEndDate : order.endDate,
          renewalRequest: {
            ...order.renewalRequest,
            status: approved ? 'approved' : 'rejected'
          }
        }
      })
    }))
}))

import { create } from 'zustand'
import type { Role, RentalOrder, ReturnCheckItem, OutfitSet, ReturnDispute } from '@/types'
import { rentalOrders as initialOrders, outfitSets as initialOutfits } from '@/data/mock'

interface StoreState {
  role: Role
  favorites: string[]
  rentalOrders: RentalOrder[]
  outfitSets: OutfitSet[]
  builderSelectedItems: string[]
  setRole: (role: Role) => void
  toggleFavorite: (outfitId: string) => void
  addRentalOrder: (order: RentalOrder) => void
  updateReturnCheck: (orderId: string, checks: ReturnCheckItem[]) => void
  handleRenewal: (orderId: string, approved: boolean) => void
  addOutfitSet: (outfit: OutfitSet) => void
  toggleBuilderItem: (itemId: string) => void
  clearBuilderItems: () => void
  setBuilderItems: (items: string[]) => void
  addDispute: (orderId: string, dispute: ReturnDispute) => void
  resolveDispute: (orderId: string, itemId: string, resolution: string) => void
  markOrderReturned: (orderId: string) => void
}

export const useStore = create<StoreState>((set) => ({
  role: 'customer',
  favorites: [],
  rentalOrders: initialOrders,
  outfitSets: initialOutfits,
  builderSelectedItems: [],
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
    })),
  addOutfitSet: (outfit) =>
    set((state) => ({
      outfitSets: [...state.outfitSets, outfit]
    })),
  toggleBuilderItem: (itemId) =>
    set((state) => ({
      builderSelectedItems: state.builderSelectedItems.includes(itemId)
        ? state.builderSelectedItems.filter((id) => id !== itemId)
        : [...state.builderSelectedItems, itemId]
    })),
  clearBuilderItems: () => set({ builderSelectedItems: [] }),
  setBuilderItems: (items) => set({ builderSelectedItems: items }),
  addDispute: (orderId, dispute) =>
    set((state) => ({
      rentalOrders: state.rentalOrders.map((order) =>
        order.id === orderId
          ? { ...order, disputes: [...(order.disputes || []), dispute] }
          : order
      )
    })),
  resolveDispute: (orderId, itemId, resolution) =>
    set((state) => ({
      rentalOrders: state.rentalOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              disputes: (order.disputes || []).map((d) =>
                d.itemId === itemId ? { ...d, status: 'resolved', resolution } : d
              )
            }
          : order
      )
    })),
  markOrderReturned: (orderId) =>
    set((state) => ({
      rentalOrders: state.rentalOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'returned' } : order
      )
    }))
}))

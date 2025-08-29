import { create } from 'zustand'

interface UIState {
  activeCarouselIndex: number
  setActiveCarouselIndex: (index: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  activeCarouselIndex: 0,
  setActiveCarouselIndex: (index) => set({ activeCarouselIndex: index }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
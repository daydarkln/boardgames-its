import { create } from 'zustand'

type UiState = {
  activeHeroSlide: number
  isMobileMenuOpen: boolean
  isAuthModalOpen: boolean
  gameFilters: {
    category: string
    district: string
    experienceLevel: string
    hasSeats: boolean
  }
  setActiveHeroSlide: (index: number) => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  openAuthModal: () => void
  closeAuthModal: () => void
  setGameFilter: (
    key: keyof UiState['gameFilters'],
    value: string | boolean
  ) => void
}

export const useUiStore = create<UiState>((set) => ({
  activeHeroSlide: 0,
  isMobileMenuOpen: false,
  isAuthModalOpen: false,
  gameFilters: {
    category: '',
    district: '',
    experienceLevel: '',
    hasSeats: false,
  },
  setActiveHeroSlide: (index) => set({ activeHeroSlide: index }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setGameFilter: (key, value) =>
    set((state) => ({
      gameFilters: {
        ...state.gameFilters,
        [key]: value,
      },
    })),
}))

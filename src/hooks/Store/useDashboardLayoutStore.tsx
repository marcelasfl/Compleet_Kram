import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type DashboardLayoutStoreType = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  selectedKeys: string[]
  setSelectedKeys: (selectedKeys: string[]) => void
}

export const useDashboardLayoutStore = create(
  persist<DashboardLayoutStoreType>(
    (set) => ({
      collapsed: false,
      setCollapsed: (collapsed) => set({ collapsed }),
      selectedKeys: [],
      setSelectedKeys: (selectedKeys) => set({ selectedKeys }),
    }),
    {
      name: 'dashboard-layout-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

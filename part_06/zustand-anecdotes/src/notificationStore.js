import { create } from 'zustand'

let timeoutId = null

const useNotificationStore = create((set) => ({
  message: null,
  actions: {
    setNotification: (message, seconds = 5) => {
      clearTimeout(timeoutId)
      set({ message })
      timeoutId = setTimeout(() => set({ message: null }), seconds * 1000)
    },
    clearNotification: () => {
      clearTimeout(timeoutId)
      set({ message: null })
    },
  },
}))

export const useNotification = () => useNotificationStore((state) => state.message)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
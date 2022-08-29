import { defineStore } from 'pinia'
import { useAccountStore } from './account'
import { useUserStore } from './user'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    showNotifications: false,

    loading: false,
    error: null,
    authenticated: false,
    hydrated: false,
  }),

  actions: {
    async hydrate() {
      const accountStore = useAccountStore()
      const userStore = useUserStore()

      console.log('hydrating appStore')

      // Skip if already hydrated or loading
      if (this.hydrated) return
      if (this.loading) return

      this.loading = true

      // Hydrate the user first
      await userStore.hydrate()

      if (userStore.currentUser) {
        await accountStore.hydrate()
      }

      this.hydrated = true
    },
  },
})

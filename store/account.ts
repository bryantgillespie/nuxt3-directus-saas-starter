import { defineStore } from 'pinia'
import { merge } from 'lodash'

import { useUserStore } from './user'
import { Account } from '~~/types/accounts'

export const useAccountStore = defineStore('accountStore', {
  state: () => ({
    account: null as Account | null,
    loading: false,
    error: null,
  }),

  getters: {},

  actions: {
    async hydrate() {
      this.loading = true
      console.log('hydrating accountStore')
      const userStore = useUserStore()
      const { $directus } = useNuxtApp()

      // Skip
      if (!userStore.currentUser || !userStore.currentUser.account) {
        this.loading = false
        return
      }
      try {
        const response = await $directus
          .items('accounts')
          .readOne(userStore.currentUser.account, { fields: ['*'] })
        console.log('hydrated account', response)
        this.account = response
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },

    async updateAccount(updates: { [key: string]: any }) {
      const { $directus, $toast } = useNuxtApp()

      const accountCopy = { ...this.currentUser }
      const updatedAccount = merge({}, accountCopy, updates)

      this.account = updatedAccount

      try {
        const response = await $directus
          .items('accounts')
          .updateOne(this.account.id, updatedAccount, { fields: ['*'] })

        this.account = response

        $toast.success('Account updated', { timeout: 3000 })
      } catch (e) {
        this.account = accountCopy
      }
    },
  },
})

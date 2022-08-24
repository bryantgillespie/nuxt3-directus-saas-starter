import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from './auth'

interface Account {
  isLoaded: Ref<boolean>
  id: string
  name: string
  slug: string
  status: string
  date_created: string
  date_updated: string
  subscriptions: Array<object>
}

export const useAccount = defineStore('account', {
  state: (): Account => ({
    isLoaded: ref(false),
    id: null,
    name: '',
    slug: '',
    status: '',
    date_created: '',
    date_updated: '',
    subscriptions: [],
  }),

  getters: {},

  actions: {
    async getAccount() {
      const auth = useAuth()
      const { $directus } = useNuxtApp()
      const user = auth.user

      try {
        const account = await $directus
          .items('accounts')
          .readOne(user.account, { fields: ['*'] })
        console.log(account)
        this.isLoaded = true
        this.id = account.id
        this.name = account.name
        this.slug = account.slug
        this.status = account.status
        this.date_created = account.date_created
        this.date_updated = account.date_updated
        this.subscriptions = account.subscriptions
      } catch (e) {
        console.log(e)
      }
    },
  },
})

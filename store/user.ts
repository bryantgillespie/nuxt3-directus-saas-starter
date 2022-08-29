import { defineStore } from 'pinia'
import { merge } from 'lodash'

import { useAppStore } from './app'
import { User } from '~~/types/users'
import { userName } from '~~/utils/user-name'

const fields = [
  'id',
  'status',
  'first_name',
  'last_name',
  'email',
  'last_login',
  'last_page',
  'theme',
  'role',
  'timezone',
  'language',
  'avatar',
  'company',
  'title',
  // Custom fields
  'account',
  'account_admin',
]

export const useUserStore = defineStore('userStore', {
  state: () => ({
    currentUser: null as User | null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => state.currentUser !== null,
    isAdmin: (state) => state.currentUser?.account_admin ?? false,
    fullName: (state) => {
      if (state.currentUser === null) return null
      return userName(state.currentUser)
    },
  },

  actions: {
    async hydrate() {
      this.loading = true
      const { $directus } = useNuxtApp()
      const appStore = useAppStore()
      console.log('hydrating userStore')

      try {
        // Try to fetch the user data
        const user = await $directus.users.me.read({
          fields,
        })
        console.log('hydrated user', user)
        this.currentUser = user
        appStore.authenticated = true
      } catch (e) {
        console.log(e)
        this.error = e
        console.log(e)
      } finally {
        this.loading = false
      }
    },

    async dehydrate() {
      this.$reset()
    },

    async updateCurrentUser(updates: { [key: string]: any }) {
      const { $directus, $toast } = useNuxtApp()

      const currentUserCopy = { ...this.currentUser }
      const updatedUser = merge({}, currentUserCopy, updates)

      this.currentUser = updatedUser

      try {
        const response = await $directus.users.me.update(updatedUser, {
          fields,
        })

        this.currentUser = response

        $toast.success('User updated', { timeout: 3000 })
      } catch (e) {
        this.currentUser = currentUserCopy
      }
    },
  },
})

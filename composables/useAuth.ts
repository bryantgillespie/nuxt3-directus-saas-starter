import { useAppStore } from '~~/store/app'
export default function useDirectusAuth() {
  const { $directus, $toast } = useNuxtApp()

  const app = useAppStore()

  const loading = ref<boolean>(false)
  const error = ref<object | string>(null)

  const login = async (credentials) => {
    try {
      loading.value = true
      const response = await $directus.auth.login({
        ...credentials,
      })

      app.authenticated = true
      await app.hydrate()
      const lastPage = useCookie('last_page')
      if (lastPage.value) {
        return navigateTo(lastPage.value)
      }
    } catch (e) {
      return e
    } finally {
      loading.value = false
    }
  }

  const refresh = async () => {
    const { $directus } = useNuxtApp()
    try {
      // Try to fetch the user data
      const user = await $directus.users.me.read({
        fields: ['*', 'profile.*'],
      })

      console.log('User data:', user)
      // Update the auth store with the user data
      app.hydrate()
    } catch (e) {
      console.log(e)
    }
  }

  const logout = async () => {
    const router = useRouter()
    const { $directus } = useNuxtApp()
    try {
      // Try to logout
      const response = await $directus.auth.logout()
      const authExpiration = useCookie('auth_expires_at')
      authExpiration.value = null

      // If logout was successful, reset the auth store
      this.$reset()

      // Send the user back to the home page
      router.push('/')
    } catch (e) {
      console.log(e)
      throw new Error('Issue logging out')
    }
  }

  return {
    loading,
    error,
    login,
    refresh,
    logout,
  }
}

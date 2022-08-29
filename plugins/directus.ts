import { BaseStorage, Directus } from '@directus/sdk'
import { useAppStore } from '~~/store/app'

// Make sure you review the Directus SDK documentation for more information
// https://docs.directus.io/sdk/javascript/

export default defineNuxtPlugin(async (nuxtApp) => {
  const { directusUrl } = useRuntimeConfig()

  const auth = useAuth()
  const appStore = useAppStore()

  // Create a new storage class to use with the SDK
  // Needed for SSR and client side rendering
  class CookieStorage extends BaseStorage {
    get(key) {
      const cookie = useCookie(key)
      return cookie.value
    }
    set(key, value) {
      const cookie = useCookie(key)
      return (cookie.value = value)
    }
    delete(key) {
      const cookie = useCookie(key)
      return (cookie.value = null)
    }
  }

  // Create a new instance of the SDK
  const directus = new Directus(directusUrl, {
    storage: new CookieStorage(),
    auth: {
      mode: 'json',
    },
  })

  // Inject the SDK into the Nuxt app
  nuxtApp.provide('directus', directus)

  const token = await directus.auth.token
  const side = process.server ? 'server' : 'client'

  //   If there's a token but we don't have a user, fetch the user
  if (token) {
    await directus.auth.refresh()
    await appStore.hydrate()
  }

  //   //   If the user is logged in but there's no token, reset the auth store {
  //   if (auth.isLoggedIn && !token) {
  //     console.log('Token not found, resetting auth store from ' + side)
  //     auth.$reset()
  //   }

  //   if (!auth.isLoggedIn && !token) {
  //     console.log(directusToken)
  //     await directus.auth.static(directusToken)
  //   }
})

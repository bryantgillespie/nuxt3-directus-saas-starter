import { BaseStorage, Directus } from '@directus/sdk'

// Make sure you review the Directus SDK documentation for more information
// https://docs.directus.io/reference/sdk.html
export default function useDirectusClient() {
  const { directusUrl } = useRuntimeConfig()

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

  return directus
}

import { useAppStore } from '~~/store/app'
const msg =
  'You must be logged in to view this page. Redirecting back to to login.'

export default defineNuxtRouteMiddleware((to, from) => {
  const appStore = useAppStore()

  if (!appStore.authenticated) {
    return navigateTo('/signin')
  }
})

import { useAuth } from '~~/store/auth'
const msg =
  'You must be logged in to view this page. Redirecting back to to login.'

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuth()
  if (!user.isLoggedIn) {
    return navigateTo('/signin')
  }
})

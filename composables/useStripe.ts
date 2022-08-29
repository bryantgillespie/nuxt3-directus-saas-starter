import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useUserStore } from '~~/store/user'
import { useAccountStore } from '~~/store/account'

export default function useStripe() {
  const userStore = useUserStore()
  const accountStore = useAccountStore()
  const { $toast } = useNuxtApp()

  const { stripePublishableKey } = useRuntimeConfig()

  const loading = ref<boolean>(false)
  const error = ref<object | string>(null)

  let stripePromise: Promise<Stripe | null>

  // Create the Stripe instance
  const getStripe = (stripePublishableKey) => {
    if (!stripePromise) {
      stripePromise = loadStripe(stripePublishableKey)
    }
    return stripePromise
  }

  // Create a Checkout Session and redirect to the Checkout page
  const handleCheckout = async (price) => {
    loading.value = true
    try {
      const session = await $fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        body: {
          user: userStore.currentUser.id,
          price,
        },
      })
      const stripe = await getStripe(stripePublishableKey)
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      })
    } catch (error) {
      console.log(error)
      $toast.error(error.message)
    } finally {
      loading.value = false
    }
  }

  // Create a Customer Portal session and redirect to the Customer Portal page
  async function getPortalLink() {
    loading.value = true
    try {
      const portalSession = await $fetch('/api/stripe/create-portal-link', {
        method: 'POST',
        body: {
          stripeCustomerId: accountStore.account.stripe_customer_id,
        },
      })
      window.location.href = portalSession.url
    } catch (error) {
      console.error(error)
      $toast.error(error.message)
    }
  }

  // List the customer's invoices
  async function listInvoices() {
    loading.value = true
    try {
      const invoices = await $fetch('/api/stripe/list-invoices', {
        method: 'POST',
        body: {
          stripeCustomerId: accountStore.account.stripe_customer_id,
        },
      })
      return invoices
    } catch (error) {
      console.error(error)
      $toast.error(error.message)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    handleCheckout,
    getPortalLink,
    listInvoices,
  }
}

import { stripe } from '~~/utils/stripe'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const { return_url } = body

  try {
    const { url } = await stripe.billingPortal.sessions.create({
      customer: user.account.stripe_customer_id,
      return_url,
    })
    return {
      url,
    }
  } catch (error) {
    createError(error)
  }
})

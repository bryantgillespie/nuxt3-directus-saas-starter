import { stripe } from '~~/server/utils/stripe'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const headers = getRequestHeaders(event)

  try {
    const { url } = await stripe.billingPortal.sessions.create({
      customer: body.stripeCustomerId,
      return_url: headers.referer,
    })
    return {
      url,
    }
  } catch (error) {
    createError(error)
  }
})

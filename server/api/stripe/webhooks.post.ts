import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
} from '~~/utils/directus-admin'
import { stripe } from '~~/utils/stripe'

const relevantEvents = [
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]

export default defineEventHandler(async (event) => {
  // Get the Stripe headers and verify the webhook
  const sig = await getHeader(event, 'stripe-signature')

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE || process.env.STRIPE_WEBHOOK_SECRET

  let stripeEvent
  try {
    if (!sig || !webhookSecret) return
    const rawBody = await readRawBody(event)
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (error) {
    createError(error)
  }

  // Handle the event
  if (relevantEvents.includes(stripeEvent.type)) {
    try {
      switch (stripeEvent.type) {
        case 'checkout.session.completed':
          const checkoutSession = stripeEvent.data.object
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription
            await manageSubscriptionStatusChange(
              subscriptionId,
              checkoutSession.customer,
              true
            )
          }
          break
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = stripeEvent.data.object
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer,
            stripeEvent.type === 'customer.subscription.created'
          )
          break
        case 'product.created':
        case 'product.updated':
          await upsertProductRecord(stripeEvent.data.object)
          break
        case 'price.created':
        case 'price.updated':
          await upsertPriceRecord(stripeEvent.data.object)
          break
        default:
          throw new Error('Unhandled relevant event!')
      }
    } catch (error) {
      console.log(error)
      createError(error.message)
    }
  } else {
    console.log('Unhandled event!')
  }
  return {
    received: true,
  }
})

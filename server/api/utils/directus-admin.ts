import { Directus } from '@directus/sdk'
import { toDateTime } from '~~/utils/time'
import { stripe } from '~~/server/utils/stripe.js'
import { Account } from '~~/types/accounts'

const staticToken = process.env.DIRECTUS_ADMIN_TOKEN
const directusUrl = process.env.DIRECTUS_URL

// Make sure you review the Directus SDK documentation for more information
// https://docs.directus.io/reference/sdk.html
//   Create a new instance of the SDK
const directusAdmin = new Directus(directusUrl, {
  storage: {
    // prefix: 'server',
  },
  auth: {
    // mode: 'cookie',
    staticToken,
  },
})

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Upsert helper function
async function upsertOne(collection, data) {
  console.log('Upserting: ', data, ' into ', collection)
  let response
  let exists

  if (data.id) {
    const { data: items } = await directusAdmin.items(collection).readByQuery({
      filter: {
        id: {
          _eq: data.id,
        },
      },
      limit: 1,
    })
    exists = items.length > 0
  }

  if (exists) {
    response = await directusAdmin.items(collection).updateOne(data.id, data)
  } else {
    response = await directusAdmin.items(collection).createOne(data)
  }

  console.log(
    `${exists ? 'Updated' : 'Created'} record [${
      data.id
    }] in collection [${collection}]`
  )
  return response
}

// //
async function upsertProductRecord(product) {
  try {
    const productData = {
      id: product.id,
      active: product.active,
      name: product.name,
      description: product.description,
      image: product.images ? product.images[0] : null,
      metadata: product.metadata,
    }

    await upsertOne('products', productData)
    console.log(`Product record updated: ${product.id}`)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

async function upsertPriceRecord(price) {
  try {
    const priceData = {
      id: price.id,
      product_id: price.product || null,
      active: price.active,
      currency: price.currency,
      description: price.nickname || null,
      pricing_type: price.type,
      unit_amount: price.unit_amount || null,
      pricing_plan_interval: price.recurring.interval,
      interval_count: price.recurring.interval_count,
      trial_period_days: price.recurring.trial_period_days || null,
      metadata: price.metadata,
    }
    await upsertOne('product_prices', priceData)
    console.log(`Price record updated: ${price.id}`)
  } catch (error) {
    throw new Error(error)
  }
}

async function activateModule(module) {}

async function manageSubscriptionStatusChange(
  subscriptionId,
  customerId,
  createAction = false
) {
  try {
    console.log('Stripe customer id: ', customerId)
    // Fetch the account UUID in database by Stripe customer_id
    const { data } = await directusAdmin.items('accounts').readByQuery({
      filter: {
        stripe_customer_id: {
          _eq: customerId,
        },
      },
      limit: 1,
    })

    console.log('Account data: ', data)

    const account = data[0]
    console.log('Account: ', account)

    const { id: uuid } = account || {}

    console.log('Account ID: ', uuid)

    // Retrieve the subscription from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['default_payment_method'],
    })

    // Map the Stripe subscription to the database subscription
    const subscriptionData = {
      id: subscription.id,
      account: {
        id: uuid,
        status: mapStripeStatus(subscription.status),
      },
      metadata: subscription.metadata,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
      quantity: subscription.quantity,
      cancel_at_period_end: subscription.cancel_at_period_end,
      cancel_at: subscription.cancel_at
        ? toDateTime(subscription.cancel_at)
        : null,
      canceled_at: subscription.cancel_at
        ? toDateTime(subscription.canceled_at)
        : null,
      current_period_start: subscription.current_period_start
        ? toDateTime(subscription.current_period_start)
        : null,
      current_period_end: subscription.current_period_end
        ? toDateTime(subscription.current_period_end)
        : null,
      created: subscription.created ? toDateTime(subscription.created) : null,
      trial_start: subscription.trial_start
        ? toDateTime(subscription.trial_start)
        : null,
      trial_end: subscription.trial_end
        ? toDateTime(subscription.trial_end)
        : null,
    }

    // Create or update the subscription record in the database
    await upsertOne('subscriptions', subscriptionData)
    console.log(
      `Inserted/updated subscription [${subscription.id}] for account [${uuid}]`
    )

    // If this is a new subscription, copy the billing details
    if (createAction && subscription.default_payment_method && uuid) {
      const customer = payment_method.customer
      const { name, phone, email, address } = payment_method.billing_details
      if (!name || !phone || !address) return

      await stripe.customers.update(customer, { name, phone, address })

      await directusAdmin.items('accounts').updateOne(uuid, {
        billing_address: address,
        contact: {
          name,
          phone,
          email,
        },
      })
    }
  } catch (error) {
    throw new Error(error)
  }
}

// Map the Stripe subscription status to the database status
// Stripe: active, canceled, past_due, trialing, unpaid, incomplete, incomplete_expired
// Database: pending, active, inactive
function mapStripeStatus(status) {
  switch (status) {
    case 'active':
    case 'trialing':
      return 'active'

    case 'canceled':
      return 'inactive'

    case 'past_due':
    case 'unpaid':
      return 'past_due'

    case 'incomplete':
    case 'incomplete_expired':
      return 'pending'

    default:
      throw new Error(`Unhandled Stripe subscription status: ${status}`)
  }
}

export {
  directusAdmin,
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
}

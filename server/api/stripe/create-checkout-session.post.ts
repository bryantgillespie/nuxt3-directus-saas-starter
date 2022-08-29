import { directusAdmin } from '~~/server/utils/directus-admin'
import { stripe } from '~~/server/utils/stripe'
const appUrl = 'http://localhost:3000'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const cookies = parseCookies(event)
  const headers = getRequestHeaders(event)
  console.log(headers)

  const { price, quantity = 1, metadata = {} } = body
  try {
    // Get the user from the request
    const user = await directusAdmin.users.readOne(body.user, {
      fields: ['id', 'email', 'account.id', 'account.stripe_customer_id'],
    })

    console.log('User from request: ', user)

    // Create or retrieve an account's Stripe customer
    let customerId
    if (!user.account.stripe_customer_id) {
      // Create customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
          account_id: user.account.id,
        },
      })

      // Set the customer ID to use with the checkout session
      console.log('Created Stripe customer: ', customer)
      customerId = customer.id

      // Update the user's account with the Stripe customer ID
      const updatedAccount = await directusAdmin
        .items('accounts')
        .updateOne(user.account.id, {
          stripe_customer_id: customer.id,
        })

      console.log('Updated account with Stripe customer ID: ', updatedAccount)
    } else {
      customerId = user.account.stripe_customer_id
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        metadata,
      },
      success_url: `${headers.referer}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headers.referer}?session_id=cancelled`,

      customer_update: {
        name: 'auto',
        address: 'auto',
      },

      phone_number_collection: {
        enabled: true,
      },
      // Enable Stripe automatic sales tax calculations
      // https://stripe.com/docs/sales-taxes#automatic-tax-calculations
      // Depends on the jusrisdications where you have nexus

      automatic_tax: {
        enabled: true,
      },
    })
    // Return the checkout session to the client
    return session
  } catch (error) {
    console.log('Error creating checkout session: ', error)
    throw new Error(error)
  }
})

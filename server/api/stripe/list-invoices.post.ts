import { stripe } from '~~/server/utils/stripe'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const headers = getRequestHeaders(event)

  if (!body.stripeCustomerId) {
    createError(new Error('Missing stripeCustomerId'))
  }

  try {
    const invoices = await stripe.invoices.list({
      customer: body.stripeCustomerId,
    })
    const invoicesFormatted = invoices.data.map((invoice) => ({
      id: invoice.id,
      created: invoice.created,
      hosted_invoice_url: invoice.hosted_invoice_url,
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      total: invoice.total,
    }))

    return invoicesFormatted
  } catch (error) {
    createError(error)
  }
})

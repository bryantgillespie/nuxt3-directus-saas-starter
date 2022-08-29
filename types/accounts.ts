export type Account = {
  id: string
  name: string
  slug: string
  status: string
  date_created: string
  date_updated: string
  billing_address: {
    city: string
    country: string
    line1: string
    line2: string
    postal_code: string
    state: string
  }
  contact: {
    email: string
    name: string
    phone: string
  }
}

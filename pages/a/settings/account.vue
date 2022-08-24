<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="sm:flex-auto">
      <h1 class="text-xl font-semibold text-gray-900">Account Settings</h1>
      <p class="mt-2 text-sm text-gray-700">
        Update your company level account settings below.
      </p>
    </div>
    <form @submit.prevent="updateAccount" class="max-w-3xl mt-8">
      <VAlert v-if="disabled" type="warning">
        You don't have permission to change or update these settings. Please
        contact other admins on your account.
      </VAlert>
      <section class="max-w-md">
        <FormKit
          type="text"
          v-model="account.name"
          :disabled="disabled"
          label="Account Name"
        />
      </section>
      <section class="grid grid-cols-4 gap-4 mt-12">
        <VDivider class="col-span-4" title="Contact Info" />
        <p class="col-span-4 mt-2 text-sm text-gray-700">
          <strong>
            This will be who we'll reach out to if there's an issues with your
            account. </strong
          ><br />
          If there's an issue with a specific job, we'll contact the user who
          submitted the job.
        </p>
        <FormKit
          type="text"
          outer-class="col-span-2"
          v-model="account.contact.name"
          :disabled="disabled"
          label="Name"
        />
        <FormKit
          type="text"
          outer-class="col-span-2"
          v-model="account.contact.phone"
          :disabled="disabled"
          label="Phone"
        />
        <FormKit
          type="text"
          outer-class="col-span-2"
          v-model="account.contact.email"
          :disabled="disabled"
          label="Email"
        />
      </section>

      <section class="grid grid-cols-4 gap-4 mt-12">
        <VDivider class="col-span-4" title="Billing Address" />

        <FormKit
          outer-class="col-span-2"
          type="text"
          v-model="account.billing_address.line1"
          :disabled="disabled"
          label="Street Address"
        />

        <FormKit
          type="text"
          outer-class="col-span-2"
          v-model="account.billing_address.line2"
          :disabled="disabled"
          label="Street Address Line 2"
        />
        <FormKit
          type="text"
          outer-class="col-span-2"
          v-model="account.billing_address.city"
          :disabled="disabled"
          label="City"
        />
        <FormKit
          type="text"
          v-model="account.billing_address.state"
          :disabled="disabled"
          label="State"
        />
        <FormKit
          type="text"
          v-model="account.billing_address.postal_code"
          :disabled="disabled"
          label="Zip / Postal"
        />
      </section>

      <VButton
        type="submit"
        :disabled="disabled"
        class="mt-8 text-right"
        variant="primary"
        >Save Account Settings</VButton
      >
    </form>
  </div>
</template>

<script setup>
import { useAuth } from '~~/store/auth'
const { $toast } = useNuxtApp()
const auth = useAuth()
const account = reactive({
  name: null,
  contact: {
    name: null,
    phone: null,
    email: null,
  },
  billing_address: {
    line1: null,
    line2: null,
    city: null,
    state: null,
    postal_code: null,
  },
})
const disabled = false
</script>

<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="sm:flex-auto">
      <h1 class="text-xl font-semibold text-gray-900">Billing Settings</h1>
      <p class="mt-2 text-sm text-gray-700">
        Update your billing information below.
      </p>
    </div>
    <div class="max-w-3xl mt-8">
      <div class="prose">
        <p>
          We use Stripe to handle your monthly subscription and invoices. Click
          the link below to manage your account, change your plan, or cancel
          your subscription.
        </p>
      </div>
      <div
        v-if="loading"
        class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50"
      >
        <VLoading class="w-24 h-24 text-primary-600" />
      </div>
      <VAlert v-if="!auth.user.account_admin" type="warning" class="mt-8">
        You don't have permission to change or update billing information.
        Please contact the other admins on your account.
      </VAlert>

      <div>
        <VButton
          :disabled="loading || !auth.user.account_admin"
          class="mt-8 text-right"
          variant="primary"
          @click="getPortalLink"
          >Manage My Billing</VButton
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~~/store/auth'
const auth = useAuth()

const { $directus, $toast } = useNuxtApp()

const loading = ref(false)
const error = ref(null)

async function getPortalLink() {
  loading.value = true
  try {
    const { raw: portalSession } = await $directus.transport.post(
      '/billing/portal',
      {
        return_url: window.location.href,
      }
    )
    window.location.href = portalSession.url
  } catch (error) {
    console.error(error)
    $toast.error(error.message)
  }
}
</script>

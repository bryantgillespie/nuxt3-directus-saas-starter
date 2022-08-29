<template>
  <div>
    <VAlert v-if="error" type="error" class="mb-4"> Error: {{ error }} </VAlert>
    <div v-if="loading" class="flex items-center justify-center flex-1">
      <VLoading class="w-24 h-24 text-primary-600" />
    </div>
    <FormKit
      type="form"
      @submit="sendPasswordReset"
      submit-label="Reset Password"
    >
      <FormKit
        v-model="email"
        type="email"
        label="Email"
        validation="required"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store/user'
const { $toast } = useNuxtApp()
const auth = useAuth()

const email = ref(null)
const password = ref(null)

const error = ref(null)
const loading = ref(false)

async function sendPasswordReset() {
  loading.value = true
  error.value = null
  try {
    // Login
    await auth.login({
      email: email.value,
      password: password.value,
    })
    // Show success toast
    $toast.success('You have logged in.', {
      timeout: 2000,
    })
    // Clear the form
    email.value = ''
    password.value = ''
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

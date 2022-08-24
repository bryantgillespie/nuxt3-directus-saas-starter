<template>
  <div>
    <VAlert v-if="error" type="error" class="mb-4"> Error: {{ error }} </VAlert>
    <div v-if="loading" class="flex items-center justify-center flex-1">
      <VLoading class="w-24 h-24 text-primary-600" />
    </div>
    <FormKit type="form" @submit="createAccount" submit-label="Create Account">
      <FormKit
        name="first_name"
        type="text"
        label="First Name"
        validation="required"
      />
      <FormKit
        name="last_name"
        type="text"
        label="Last Name"
        validation="required"
      />
      <FormKit name="email" type="email" label="Email" validation="required" />
      <FormKit
        name="password"
        type="password"
        label="Password"
        validation="required"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~~/store/auth'
const { $toast } = useNuxtApp()
const auth = useAuth()

const error = ref(null)
const loading = ref(false)

const form = reactive({
  first_name: null,
  last_name: null,
  email: null,
  password: null,
})

async function login() {
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

<template>
  <div>
    <VAlert v-if="error" type="error" class="mb-4"> Error: {{ error }} </VAlert>
    <div v-if="loading" class="flex items-center justify-center flex-1">
      <VLoading class="w-24 h-24 text-primary-600" />
    </div>
    <FormKit type="form" @submit="login" submit-label="Sign In">
      <FormKit
        v-model="credentials.email"
        type="email"
        label="Email"
        validation="required"
      />
      <FormKit
        v-model="credentials.password"
        type="password"
        label="Password"
        validation="required"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp()
const auth = useAuth()
const { loading, error } = auth

const credentials = reactive({
  email: null,
  password: null,
})

async function login() {
  // Login
  await auth.login(credentials)
  // Show success toast
  $toast.success('You have logged in.', {
    timeout: 2000,
  })
  // Clear the form
  credentials.email = null
  credentials.password = null
}
</script>

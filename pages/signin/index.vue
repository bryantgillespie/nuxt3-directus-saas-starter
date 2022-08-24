<template>
  <div>
    <p>Welcome back to {{ appName }}</p>
    <LoginForm />
    <NuxtLink href="/signin/forgot-password" class="text-sm text-gray-600">
      Forgot Your Password?
    </NuxtLink>
    <p>
      New to {{ appName }}?
      <NuxtLink href="/signin/signup">Create an account</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { appName } from '~~/app.settings.js'
definePageMeta({
  layout: 'auth-layout',
})
</script>

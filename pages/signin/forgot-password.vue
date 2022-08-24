<template>
  <div>
    <p>Forgot your password?</p>
    <p>
      Enter your email address and we'll send you a link to reset your password.
    </p>
    <PasswordResetForm />
    <NuxtLink href="/signin" class="text-sm text-gray-600">
      Back to signin
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
})
</script>

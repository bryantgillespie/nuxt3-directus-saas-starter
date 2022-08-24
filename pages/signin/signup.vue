<template>
  <div>
    <p>Create your {{ appName }} account</p>
    <SignupForm />
    <p>
      Already have a {{ appName }} account?
      <NuxtLink href="/signin">Sign in</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { appName } from '~~/app.settings.js'
definePageMeta({
  layout: 'auth-layout',
})
</script>

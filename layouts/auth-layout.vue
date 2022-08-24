<template>
  <div
    class="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <Logo class="w-auto h-12 mx-auto" />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
</script>

<style>
html {
  @apply h-full bg-gray-50;
}
body {
  @apply h-full;
}
</style>

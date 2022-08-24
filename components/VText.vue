<template>
  <component class="text-gray-700 dark:text-gray-500" :is="as">
    <slot />
  </component>
</template>
<script setup lang="ts">
const props = defineProps({
  as: {
    type: String,
    default: 'p',
  },
})
</script>

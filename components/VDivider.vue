<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div
        class="w-full transition duration-150 border-t border-gray-300 dark:border-gray-700"
      ></div>
    </div>
    <div class="relative flex justify-start">
      <span
        class="pr-3 text-sm font-medium text-gray-400 transition duration-150 bg-white dark:bg-gray-900 md:text-base dark:text-gray-500"
      >
        {{ title }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, default: null },
  },
}
</script>

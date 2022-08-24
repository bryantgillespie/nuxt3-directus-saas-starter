<template>
  <button
    @click="(e) => toggleDark()"
    class="p-1 text-gray-400 hover:text-white"
  >
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 "
      mode="out-in"
    >
      <MoonIcon v-if="isDark" class="w-8 h-8" />
      <SunIcon v-else-if="!isDark" class="w-8 h-8" />
    </transition>
  </button>
</template>

<script setup>
import { MoonIcon, SunIcon } from '@heroicons/vue/outline'
const { isDark, toggleDark } = useDarkMode()
</script>

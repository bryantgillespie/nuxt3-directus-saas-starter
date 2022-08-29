<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/outline'
</script>
<template>
  <div>
    <PageHeader>
      <NuxtLink
        class="transition duration-150 hover:text-primary-600"
        to="/a/items"
      >
        <h2 class="text-3xl font-bold tracking-tight">Items</h2>
      </NuxtLink>
      <ChevronRightIcon class="w-5 h-5 text-gray-400" />
      <NuxtLink
        class="transition duration-150 hover:text-primary-600"
        to="/a/items/id"
      >
        <h2 class="text-3xl font-bold tracking-tight">ID</h2>
      </NuxtLink>
      <ChevronRightIcon class="w-5 h-5 text-gray-400" />
      <h2 class="text-3xl font-bold tracking-tight">Edit</h2>
    </PageHeader>
  </div>
</template>

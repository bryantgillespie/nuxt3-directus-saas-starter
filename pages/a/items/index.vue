<script setup lang="ts">
const { readByQuery } = useItems()
const { data, loading, error } = await readByQuery('app_items', {})
</script>
<template>
  <div>
    <PageHeader>
      <h2 class="text-3xl font-bold tracking-tight">Items</h2>
    </PageHeader>
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else>{{ data }}</div>
    </div>
  </div>
</template>

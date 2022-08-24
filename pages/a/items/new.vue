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
      <h2 class="text-3xl font-bold tracking-tight">New</h2>
    </PageHeader>
    <main class="max-w-4xl mx-auto">
      <FormKit
        type="form"
        submit-label="Save Item"
        @submit="saveItem"
        v-model="form"
      >
        <FormKitSchema :schema="app_items" />
      </FormKit>
    </main>
  </div>
</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/outline'
import { app_items } from '~~/utils/form-schemas'

const { createOne } = useItems()

const form = reactive({})

async function saveItem() {
  const { data } = await createOne('app_items', form)
  console.log(data)
}
</script>

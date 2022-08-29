<template>
  <div class="flex justify-between px-6 py-4 rounded-lg bg-gray-50">
    <div class="items-center md:grid md:grid-cols-5 md:gap-4 md:w-full">
      <div class="flex items-center space-x-2 md:col-span-2">
        <img
          v-if="avatar"
          class="object-cover w-12 h-12 rounded-full"
          :src="avatar"
          alt=""
        />
        <div v-else-if="!avatar" class="w-12 h-12 bg-gray-200 rounded-full" />
        <p class="text-sm font-medium text-gray-900">
          {{ name }}
        </p>
      </div>
      <p class="text-sm text-gray-500 md:col-span-2">{{ email }}</p>
      <p class="">
        <span
          v-if="isAdmin"
          class="px-2 py-1 rounded-md bg-primary-200 text-primary-700"
          >Admin</span
        >
      </p>
    </div>
    <div class="flex my-2 space-x-4">
      <VButton
        :disabled="!auth.isAdmin"
        class="text-sm"
        variant="outline"
        @click="emit('edit')"
      >
        <PencilIcon class="w-5 h-5" />
      </VButton>
      <VButton
        :disabled="!auth.isAdmin"
        class="text-sm"
        variant="danger"
        @click="emit('delete')"
      >
        <TrashIcon class="w-5 h-5" />
      </VButton>
    </div>
  </div>
</template>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import { useUserStore } from '~~/store/user'
const auth = useAuth()

const emit = defineEmits(['edit', 'delete'])
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})
</script>

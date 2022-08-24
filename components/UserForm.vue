<template>
  <form @submit.prevent="saveUser">
    <div class="grid gap-4 pt-6 md:grid-cols-2">
      <FormKit
        v-model="user.first_name"
        name="first_name"
        type="text"
        label="First Name"
        placeholder="John"
        required
      />
      <FormKit
        v-model="user.last_name"
        name="last_name"
        type="text"
        label="Last Name"
        placeholder="Doe"
        required
      />
      <FormKit
        outer-class="col-span-2"
        v-model="user.email"
        name="email"
        type="email"
        label="Email address"
        placeholder="john@example.com"
        required
      />
      <FormKit
        v-if="!user.id"
        outer-class="col-span-2"
        v-model="user.password"
        name="password"
        type="password"
        label="Password"
        required
      />
      <FormKit
        v-if="auth.user.account_admin"
        class="col-span-2"
        v-model="user.account_admin"
        name="account_admin"
        label="Admin"
        description="Admin users can adjust can control the order of the job queue and adjust settings of other users."
      />
      <!-- <VUpload
        class="col-span-2"
        v-model="user.avatar"
        name="avatar"
        label="Avatar"
      /> -->
    </div>
    <div class="flex items-center justify-end mt-8 space-x-4">
      <VButton type="button" @click="emit('cancel')">
        <span>Cancel</span>
      </VButton>
      <VButton type="submit" variant="primary">
        <span>Save User</span>
      </VButton>
    </div>
  </form>
</template>
<script setup>
import { useAuth } from '~~/store/auth'
const auth = useAuth()

const props = defineProps({
  userId: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['success', 'cancel'])
const user = ref({})
</script>

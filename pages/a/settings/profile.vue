<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="sm:flex-auto">
      <h1 class="text-xl font-semibold text-gray-900">User Profile</h1>
      <p class="mt-2 text-sm text-gray-700">Update your user profile below.</p>
    </div>
    <FormKit
      type="form"
      class="max-w-3xl mt-8"
      @submit=""
      submit-label="Save User Profile"
    >
      <section class="grid grid-cols-4 gap-4 mt-12">
        <FormKit
          type="text"
          v-model="user.first_name"
          outer-class="col-span-2"
          label="First Name"
          required
        />
        <FormKit
          type="text"
          v-model="user.last_name"
          outer-class="col-span-2"
          label="Last Name"
          required
        />
        <FormKit
          type="text"
          v-model="user.email"
          outer-class="col-span-2"
          label="Email"
          required
        />
        <FormKit
          v-model="user.phone"
          type="tel"
          outer-class="col-span-2"
          label="Phone"
        />
        <div class="col-span-2">
          <VLabel label="Password" />
          <VButton>Change My Password</VButton>
        </div>
      </section>
      <!-- <VDivider class="col-span-4 mt-8" title="Notifications" />
      <section class="grid grid-cols-4 gap-2 py-4">
        <FormKit
          type="checkbox"
          outer-class="col-span-4"
          v-model="user.account_notifications.job_comments"
          name="job_comments"
          label="Email me when comments are added to my jobs"
        />
        <FormKit
          type="checkbox"
          outer-class="col-span-4"
          v-model="user.account_notifications.job_completed"
          name="job_completed"
          label="Email me when jobs are completed"
        />
      </section> -->
      <VDivider class="py-4" />
    </FormKit>
  </div>
</template>

<script setup>
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/outline'
const { $toast } = useNuxtApp()

const user = ref({
  id: null,
  first_name: null,
  last_name: null,
  email: null,
  account_admin: null,
  phone: null,
  avatar: null,
  account_notifications: {
    job_comments: null,
    job_completed: null,
  },
})
</script>

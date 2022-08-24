<template>
  <div
    class="w-full max-w-4xl mx-auto overflow-hidden divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-6"
  >
    <div
      v-for="(action, actionIdx) in actions"
      :key="actionIdx"
      :class="[
        'relative group bg-gray-50 dark:bg-gray-700 p-6 rounded-lg focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500',
      ]"
    >
      <div>
        <span
          :class="[
            'rounded-lg inline-flex p-3 ring-2 ring-primary-300 bg-primary-100 text-primary-700',
          ]"
        >
          <component :is="action.icon" class="w-6 h-6" aria-hidden="true" />
        </span>
      </div>
      <div class="mt-8">
        <h3 class="text-lg font-medium">
          <NuxtLink
            :to="action.href"
            class="focus:outline-none dark:text-white"
          >
            <!-- Extend touch target to entire panel -->
            <span class="absolute inset-0" aria-hidden="true" />
            {{ action.title }}
          </NuxtLink>
        </h3>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">
          {{ action.description }}
        </p>
      </div>
      <span
        class="absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup>
import {
  CreditCardIcon,
  OfficeBuildingIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/vue/outline'

const actions = [
  {
    title: 'My User Profile',
    description: 'Manage your personal information',
    href: '/a/settings/profile',
    icon: UserCircleIcon,
  },
  {
    title: 'Account Settings',
    description: 'Manage your account settings',
    href: '/a/settings/account',
    icon: OfficeBuildingIcon,
  },
  {
    title: 'Users',
    description: 'Manage your users',
    href: '/a/settings/users',
    icon: UsersIcon,
  },
  {
    title: 'Billing',
    description: 'Manage your billing information',
    href: '/a/settings/billing',
    icon: CreditCardIcon,
  },
]
</script>

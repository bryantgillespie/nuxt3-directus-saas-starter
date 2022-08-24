<template>
  <nav class="space-y-1" aria-label="Sidebar">
    <template v-for="item in navigation" :key="item.name">
      <div v-if="item.type === 'divider'" class="py-2">
        <hr class="border-t-2 border-gray-200 border-dashed" />
      </div>
      <NuxtLink
        v-else
        :href="item.href"
        exact-active-class="text-gray-900 bg-gray-100"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <component
          :is="item.icon"
          exact-active-class="text-gray-500"
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span class="truncate">
          {{ item.name }}
        </span>
      </NuxtLink>
    </template>
  </nav>
</template>

<script setup>
import {
  OfficeBuildingIcon,
  CreditCardIcon,
  UsersIcon,
  UserCircleIcon,
} from '@heroicons/vue/outline'

const navigation = [
  {
    name: 'My Profile',
    href: '/a/settings/profile',
    icon: UserCircleIcon,
  },
  { type: 'divider' },
  {
    name: 'Account',
    href: '/a/settings/account',
    icon: OfficeBuildingIcon,
  },
  {
    name: 'Users',
    href: '/a/settings/users',
    icon: UsersIcon,
  },
  {
    name: 'Billing',
    href: '/a/settings/billing',
    icon: CreditCardIcon,
  },
]
</script>

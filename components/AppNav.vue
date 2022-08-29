<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open, close }">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <NuxtLink to="/a/items">
              <Logo class="h-8 text-white" />
            </NuxtLink>
          </div>
          <div class="hidden md:block">
            <div class="flex items-center ml-10 space-x-6">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                exact-active-class="text-white bg-gray-900"
                class="flex items-center px-3 py-2 font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                :aria-current="item.current ? 'page' : undefined"
              >
                <component :is="item.icon" class="w-6 h-6 mr-2" />
                <span>{{ item.name }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="flex items-center ml-4 md:ml-6">
            <!-- Action Button - Replace with your own action button -->
            <NuxtLink
              to="/a/items/new"
              :class="[
                'py-2 pr-4 pl-2 mr-4 rounded-lg  font-medium inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white',
              ]"
            >
              <PlusIcon class="w-5 h-5" />
              <span class="ml-2">New Item</span>
            </NuxtLink>
            <!-- End Action Button - Replace with your own action button -->
            <button
              type="button"
              class="relative flex-shrink-0 p-1 mr-2 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="w-8 h-8" aria-hidden="true" />
              <span
                class="absolute bottom-0 right-0 block h-3.5 w-3.5 transform rounded-full ring ring-gray-800 bg-red-500"
              />
            </button>
            <DarkModeToggle />
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="flex items-center max-w-xs text-sm bg-gray-800 border-2 border-white border-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span class="sr-only">Open user menu</span>
                  <!-- <img
                    v-if="auth.isLoggedIn"
                    class="object-cover w-8 h-8 rounded-full 0"
                    :src="fileUrl(auth.user.avatar)"
                    alt=""
                  /> -->
                  <div class="w-8 h-8 bg-gray-300 rounded-full" />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="p-2 border-b border-gray-200">
                    <div
                      class="text-sm font-medium leading-none text-gray-700 truncate"
                    >
                      {{ auth.user.first_name + ' ' + auth.user.last_name }}
                    </div>
                    <div
                      class="mt-1 text-xs font-medium leading-none text-gray-400"
                    >
                      {{ auth.user.email }}
                    </div>
                  </div>
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <NuxtLink
                      :to="item.href"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >{{ item.name }}</NuxtLink
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
        <div class="flex -mr-2 md:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block w-6 h-6" aria-hidden="true" />
            <XIcon v-else class="block w-6 h-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel
      class="absolute w-full bg-gray-800 border-b border-primary-900 md:hidden"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          @click="closeMenu(close)"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</NuxtLink
        >
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
          <div v-if="auth.isLoggedIn" class="flex-shrink-0">
            <img
              class="object-cover w-10 h-10 rounded-full"
              :src="fileUrl(auth.user.avatar)"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">
              {{ auth.user.first_name + ' ' + auth.user.last_name }}
            </div>
            <div class="text-sm font-medium leading-none text-gray-400">
              {{ auth.user.email }}
            </div>
          </div>
        </div>
        <div class="px-2 mt-3 space-y-1">
          <NuxtLink
            v-for="item in userNavigation"
            :key="item.name"
            :href="item.href"
            class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
            @click="closeMenu(close)"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import {
  PlusIcon,
  BellIcon,
  MenuIcon,
  XIcon,
  ClipboardListIcon,
  CogIcon,
  SupportIcon,
} from '@heroicons/vue/outline'

import { useUserStore } from '~~/store/user'
// import { useApp } from '~~/store/app'
const route = useRoute()

function closeMenu(close) {
  close()
}

const auth = useAuth()
const { fileUrl } = useFiles()

const navigation = [
  { name: 'Items', href: '/a/items', icon: ClipboardListIcon },
  { name: 'Settings', href: '/a/settings', icon: CogIcon },
]

const userNavigation = [
  { name: 'Your Profile', href: '/a/settings/profile' },
  { name: 'Sign Out', href: '/signin/logout' },
]
</script>

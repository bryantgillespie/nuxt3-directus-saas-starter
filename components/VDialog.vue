<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog
      as="div"
      class="fixed inset-0 z-10 overflow-y-auto"
      @close="closeModal"
    >
      <div
        class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-800 opacity-50 dark:opacity-90 dark:bg-gray-900"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  v-if="type === 'danger'"
                  :class="[
                    'flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto  rounded-full sm:mx-0 sm:h-10 sm:w-10',
                    {
                      'bg-red-100': type === 'danger',
                    },
                  ]"
                >
                  <component
                    :is="iconMap[type]"
                    :class="['w-6 h-6', { 'text-red-600': type === 'danger' }]"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    {{ title }}
                  </DialogTitle>
                  <div class="flex flex-col">
                    <slot />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <VButton
                class="mt-3 sm:mt-0 sm:ml-3"
                @click="onConfirm"
                :variant="type"
                >{{ confirmText }}</VButton
              >
              <VButton class="sm:ml-3" @click="onCancel" variant="outline">{{
                cancelText
              }}</VButton>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { XIcon } from '@heroicons/vue/solid'
import { ExclamationIcon } from '@heroicons/vue/outline'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'

const emit = defineEmits(['close'])

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'primary',
  },
  actions: {
    type: Array,
    default: () => [],
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
  onCancel: {
    type: Function,
    default: () => {},
  },
  onConfirm: {
    type: Function,
    default: () => {},
  },
})

const iconMap = {
  danger: ExclamationIcon,
  //   error: XCircleIcon,
}

function closeModal() {
  emit('close')
}
</script>

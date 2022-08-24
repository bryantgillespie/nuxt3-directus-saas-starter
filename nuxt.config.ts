import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ['~~/assets/css/tailwind.css'],

  buildModules: [
    // https://pinia.esm.dev
    '@pinia/nuxt',
    // https://vueuse.org/
    '@vueuse/nuxt',
  ],

  modules: ['@formkit/nuxt'],

  meta: {
    // Add inter var font
    link: [{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }],
  },

  runtimeConfig: {
    public: {
      directusUrl: process.env.DIRECTUS_URL,
    },
  },

  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          'postcss-import': {},
          'tailwindcss/nesting': {},
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    transpile: ['@heroicons/vue', '@headlessui/vue'],
  },

  vite: {
    optimizeDeps: {
      include: [
        '@heroicons/vue/solid',
        '@heroicons/vue/outline',
        '@headlessui/vue',
        'vue',
        'pinia',
      ],
    },
  },
})

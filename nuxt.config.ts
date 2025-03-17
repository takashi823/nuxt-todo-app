// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui'
  ],
  css: ['~/assets/css/main.css'],
  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: 'double',
        indent: 'tab',
      },
    },
  },
})

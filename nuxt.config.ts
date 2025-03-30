// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/scripts',
    '@nuxtjs/google-adsense',
   
  ],
  ssr: false,
  app: {
    baseURL: '/shake-tv-nuxt/'
  }
})
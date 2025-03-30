// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@vite-pwa/nuxt',
    '@nuxt/scripts',
    '@nuxtjs/google-adsense',
   
  ],
  ssr: false,
  app: {
    baseURL: '/shake-tv-nuxt/'
  },
  pwa: {
    manifest: {
      name: 'Shake TV',
      short_name: 'Shake TV',
      description: 'Watch and share short videos.',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/icon.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://api.shaketv.net/.*',
          handler: 'NetworkFirst'
        }
      ]
    }
  }
})
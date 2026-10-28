import { SITE } from './shared/utils/site'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },

  // Latin subsets only: every character of the site is in them.
  css: [
    '@fontsource/kumbh-sans/latin-300.css',
    '@fontsource/kumbh-sans/latin-400.css',
    '@fontsource/kumbh-sans/latin-500.css',
    '@fontsource/kumbh-sans/latin-600.css',
    '@fontsource/kumbh-sans/latin-700.css',
    '@fontsource/kumbh-sans/latin-800.css',
    '@fontsource/kumbh-sans/latin-900.css',
    '@fontsource/geist-mono/latin-300.css',
    '@fontsource/geist-mono/latin-600.css',
    '@fontsource/playfair-display/latin-400-italic.css',
    '~/assets/css/main.css',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#101010' },
        { property: 'og:site_name', content: SITE.name },
        { property: 'og:locale', content: 'fr_FR' },
        { name: 'twitter:card', content: 'summary' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // Pages are prerendered at build time (SSG). The only runtime code is the
  // contact endpoint, deployed as a serverless function.
  routeRules: {
    '/home': { redirect: { to: '/', statusCode: 301 } },
    '/playground/**': { redirect: { to: '/pl4ygr0und', statusCode: 301 } },
    '/api/content/**': { prerender: true },
  },

  nitro: {
    // Cloudflare Pages: polyfill Node built-ins instead of relying on the
    // project's nodejs_compat flag (the worker only relays the contact form).
    cloudflare: {
      nodeCompat: false,
      // Folders of static files in one rule each: Pages accepts 100 rules at most.
      pages: { routes: { exclude: ['/media/*', '/api/content/*'] } },
    },
    handlers: [{ route: '/media/**', handler: '~~/server/media.ts', env: 'prerender' }],
    prerender: {
      crawlLinks: true,
      // services.html rather than services/index.html, so hosts serve /services
      // without redirecting to /services/.
      autoSubfolderIndex: false,
      routes: [
        '/',
        '/services',
        '/projets',
        '/pl4ygr0und',
        '/contact',
        '/sitemap.xml',
        '/api/content/projects.json',
        '/api/content/tools.json',
        '/api/content/playground.json',
      ],
    },
  },

  typescript: { strict: true },
})

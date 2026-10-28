import sharp from 'sharp'

// Build only (registered for the prerender step in nuxt.config): never shipped
// with the contact function.
export default defineEventHandler(async event => {
  const name = event.path.replace(/^\/media\//, '')
  const media = getMedia(name)
  if (!media) throw createError({ statusCode: 404 })

  const source = Buffer.from(await $fetch<ArrayBuffer>(media.src, { responseType: 'arrayBuffer' }))
  if (!media.width) {
    setResponseHeader(event, 'content-type', 'image/svg+xml')
    return source
  }

  setResponseHeader(event, 'content-type', 'image/webp')
  return sharp(source).resize({ width: media.width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()
})

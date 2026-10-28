import { LAYERS, SITE } from '#shared/utils/site'

export default defineEventHandler(async event => {
  const projects = await listRows(TABLES.projects, { filter__Actif__boolean: 'true' }).then(rows => rows.map(toProject))
  const paths = ['/', ...LAYERS.map(layer => `/${layer.slug}`), ...projects.filter(p => p.slug).map(p => `/projet/${p.slug}`)]

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(path => `  <url><loc>${SITE.url}${path}</loc></url>`).join('\n')}
</urlset>
`
})

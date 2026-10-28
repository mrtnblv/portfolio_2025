export default defineEventHandler(async () => {
  const rows = await listRows(TABLES.projects, { filter__Actif__boolean: 'true' })
  return rows.map(toProject).filter(project => project.slug)
})

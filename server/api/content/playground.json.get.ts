export default defineEventHandler(async () => {
  const rows = await listRows(TABLES.playground, { filter__Actif__boolean: 'true' })
  return rows
    .map(toPlaygroundItem)
    .sort((a, b) => a.number.localeCompare(b.number, 'fr', { numeric: true }))
})

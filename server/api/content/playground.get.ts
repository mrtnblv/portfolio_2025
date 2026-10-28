export default defineEventHandler(async () => {
  const rows = await listRows(TABLES.playground)
  return rows
    .map(toPlaygroundItem)
    .sort((a, b) => a.number.localeCompare(b.number, 'fr', { numeric: true }))
})

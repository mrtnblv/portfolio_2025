export default defineEventHandler(async () => {
  const rows = await listRows(TABLES.tools)
  return rows.map(toTool).filter(tool => tool.logo)
})

import { marked } from 'marked'
import type { ContentImage, PlaygroundItem, Project, Tool } from '#shared/types/content'

// Baserow is only queried at build time (prerender). The token never reaches
// the browser and is read from the environment, never from the repository.
const API = 'https://api.baserow.io/api/database/rows/table'

export const TABLES = {
  projects: 415391,
  tools: 355757,
  playground: 415385,
} as const

type Row = Record<string, unknown>

export async function listRows(table: number, query: Record<string, string> = {}): Promise<Row[]> {
  const token = process.env.TOKEN_BASEROW
  if (!token) {
    console.warn(`[baserow] TOKEN_BASEROW is not set, table ${table} is rendered empty.`)
    return []
  }

  const rows: Row[] = []
  let page = 1
  while (true) {
    const res = await $fetch<{ results: Row[]; next: string | null }>(`${API}/${table}/`, {
      headers: { Authorization: `Token ${token}` },
      query: { user_field_names: 'true', size: '200', page: String(page), ...query },
    })
    rows.push(...res.results)
    if (!res.next) return rows
    page++
  }
}

/** Baserow returns plain values, single/multiple selects or lookups depending on the field type. */
function text(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) return value.map(text).filter(Boolean).join(', ')
  if (typeof value === 'object' && 'value' in value) return text((value as { value: unknown }).value)
  return ''
}

function list(value: unknown): string[] {
  if (!Array.isArray(value)) return text(value) ? [text(value)] : []
  return value.map(text).filter(Boolean)
}

function images(value: unknown): ContentImage[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((file): file is Row => !!file && typeof file === 'object' && typeof (file as Row).url === 'string')
    .map(file => ({
      url: file.url as string,
      width: typeof file.image_width === 'number' ? file.image_width : undefined,
      height: typeof file.image_height === 'number' ? file.image_height : undefined,
    }))
}

function html(value: unknown): string {
  const source = text(value)
  if (!source) return ''
  return source.startsWith('<') ? source : (marked.parse(source, { async: false }) as string)
}

export function toProject(row: Row): Project {
  return {
    slug: text(row.Slug),
    title: text(row.Title_text),
    year: text(row.Year_text),
    client: text(row.Client_Title_text),
    collaboration: text(row.Collab_Title_text),
    role: text(row.Role_text),
    technique: text(row.Technique_text),
    description: html(row.Description_text),
    cover: images(row.Cover)[0] ?? null,
    shots: images(row.Shots),
  }
}

export function toTool(row: Row): Tool {
  return { name: text(row.Nom), logo: images(row.Logo)[0] ?? null }
}

export function toPlaygroundItem(row: Row): PlaygroundItem {
  return {
    number: text(row.PGNum_text),
    title: text(row.Title_text),
    url: text(row.URL),
    categories: list(row.Categories),
  }
}

export interface ContentImage {
  url: string
  width?: number
  height?: number
}

export interface Project {
  slug: string
  title: string
  year: string
  client: string
  collaboration: string
  role: string
  technique: string
  /** HTML, rendered from the Baserow rich text at build time. */
  description: string
  cover: ContentImage | null
  shots: ContentImage[]
}

export interface Tool {
  name: string
  logo: ContentImage | null
}

export interface PlaygroundItem {
  number: string
  title: string
  url: string
  categories: string[]
}

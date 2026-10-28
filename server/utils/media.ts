// Baserow files are downloaded at build time and resized to the size they are
// displayed at, then served from /media like any static file.
interface MediaSource {
  src: string
  /** Target width; left out for SVG, copied as is. */
  width?: number
}

const sources = new Map<string, MediaSource>()

export function getMedia(name: string): MediaSource | undefined {
  return sources.get(name)
}

/** Returns the local URL of a Baserow file at the given width (outside the build: the original URL). */
export function mediaUrl(src: string, width?: number): string {
  if (!import.meta.prerender) return src
  // Baserow names its files "<random>_<sha256>.<ext>": the end of the hash is unique enough.
  const file = new URL(src).pathname.split('/').pop()!
  const svg = file.endsWith('.svg')
  const id = file.replace(/\.\w+$/, '').slice(-16)
  const name = svg ? `${id}.svg` : `${id}-${width}.webp`
  sources.set(name, svg ? { src } : { src, width })
  return `/media/${name}`
}

/** UI state shared between the hero, the layers and the loader. */
export function useSiteState() {
  const menuOpen = useState('menuOpen', () => false)
  const loaderCovering = useState('loaderCovering', () => false)
  const formSubmitted = useState('formSubmitted', () => false)

  /** Drops the loader bars, waits for them to cover the screen, then navigates (same timing as Weweb). */
  async function navigateWithLoader(to: string) {
    loaderCovering.value = true
    const reducedMotion = import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    await new Promise(resolve => setTimeout(resolve, reducedMotion ? 0 : 1000))
    await navigateTo(to)
  }

  return { menuOpen, loaderCovering, formSubmitted, navigateWithLoader }
}

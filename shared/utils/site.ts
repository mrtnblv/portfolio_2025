export const SITE = {
  name: 'MARTIN B. LEVY',
  url: 'https://martinblevy.com',
  email: 'contact@martinblevy.com',
  defaultTitle: 'MARTIN B. LEVY | Product Builder freelance à Marseille',
  defaultDescription:
    'Façonnons ensemble votre présence numérique ! SAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugin Bubble, API...',
  image: '/images/mbl_favicon.webp',
} as const

export type LayerSlug = 'services' | 'projets' | 'pl4ygr0und' | 'contact'

export interface LayerConfig {
  slug: LayerSlug
  index: 1 | 2 | 3 | 4
  label: string
  title: string
  description: string
  /** Desktop: the layer is `100vw - width` wide. */
  width: number
  /** Desktop: visible strip when closed, measured from the right edge. */
  closed: number
  /** Desktop: left offset when open. */
  opened: number
  /** Tablet and mobile, menu open: visible strip (layer 1 uses it as a left offset). */
  closedTablet: number
  closedMobile: number
}

// Same values as the `layers_settings` variable of the Weweb project.
export const LAYERS: LayerConfig[] = [
  {
    slug: 'services',
    index: 1,
    label: 'Services',
    title: 'Services',
    description:
      'Développement sur-mesure de plateformes web, ERP, CRM, intranets, simulateurs et API : des outils pensés pour votre façon de travailler.',
    width: 330,
    closed: 320,
    opened: 240,
    closedTablet: 240,
    closedMobile: 80,
  },
  {
    slug: 'projets',
    index: 2,
    label: 'Projets',
    title: 'Projets',
    description: 'Une sélection de projets réalisés par Martin B. Levy, Product Builder freelance à Marseille.',
    width: 360,
    closed: 190,
    opened: 285,
    closedTablet: 320,
    closedMobile: 202,
  },
  {
    slug: 'pl4ygr0und',
    index: 3,
    label: 'Pl4ygr0unD',
    title: 'Pl4ygr0und',
    description: 'Expérimentations, side projects et petits outils : le terrain de jeu de Martin B. Levy.',
    width: 340,
    closed: 100,
    opened: 330,
    closedTablet: 200,
    closedMobile: 120,
  },
  {
    slug: 'contact',
    index: 4,
    label: 'Contact',
    title: 'Contact',
    description: 'Un projet en tête ? Décrivez-le en quelques lignes et rencontrons-nous.',
    width: 350,
    closed: 40,
    opened: 375,
    closedTablet: 80,
    closedMobile: 50,
  },
]

export const SOCIALS = [
  { name: 'Email', icon: 'mail', href: `mailto:${SITE.email}`, external: false },
  { name: 'Github', icon: 'github', href: 'https://github.com/mrtnblv', external: true },
  { name: 'Linkedin', icon: 'linkedin', href: 'https://www.linkedin.com/in/martinblevy/', external: true },
  { name: 'Discord mrtnblv', icon: 'discord', href: 'https://discord.com/users/mrtnblv', external: true },
] as const

/** Background colours of the playground rows, cycled by index. */
export const PLAYGROUND_COLORS = ['#EF9595', '#EFB395', '#EFE995', '#B9EF95', '#95EFEC', '#95A5EF', '#AE95EF', '#EF95E5', '#FFFFFF']

export const PROJECT_CATEGORIES = [
  'Application',
  'Redesign',
  'Développement',
  'Expertise',
  'SaaS',
  'MVP',
  'Outil interne',
  'Maintenance / Update',
  'Optimisation',
  'Backoffice',
  'Autres',
]

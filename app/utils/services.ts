export interface ServiceBlock {
  title: string
  paragraphs: string[]
  /** Paragraph indexes rendered in italics. */
  italic?: number[]
  /** Shows the infinite tools strip under the block. */
  tools?: boolean
}

const nbsp = ' '

export const SERVICES: ServiceBlock[] = [
  {
    title: 'Des solutions uniques pour des besoins uniques',
    paragraphs: [
      'Chaque entreprise a son propre fonctionnement et une organisation spécifique.',
      'Bien que des similitudes existent dans la gestion des sociétés, certaines particularités nécessitent des outils et des fonctionnalités sur-mesure.',
      'Mon rôle est d’appréhender vos impératifs et priorités.',
      'Pour rendre votre gestion plus efficiente, je propose des solutions de développement adaptées à vos besoins, que ce soit pour des sites web, des plateformes, des applications ou des outils logiciels sur mesure.',
    ],
  },
  {
    title: `Pourquoi choisir une solution sur${nbsp}mesure${nbsp}?`,
    paragraphs: [
      'Lorsque les solutions standardisées ne répondent plus à vos besoins, il est temps de passer au développement sur mesure.',
      'Je mets mon savoir-faire à votre service pour concevoir des outils logiciels et plateformes web parfaitement adaptés à votre façon de travailler.',
      'Vous avez un projet de site ou d’application web à forte valeur ajoutée ?',
      'Je suis à votre écoute pour vous proposer une solution sur-mesure qui s\'aligne avec vos idées et votre stratégie.',
    ],
  },
  {
    title: `Un suivi personnalisé et${nbsp}flexible`,
    paragraphs: [
      'Votre projet est pris en charge de A à Z, avec un accompagnement à chaque étape pour garantir transparence et flexibilité.',
      'Grâce à l\'approche Agile, nous avançons ensemble étape par étape, tout en restant à votre écoute pour anticiper au plus vite les imprévus ou changements d’orientation.',
      'Cette méthode est particulièrement efficace pour les projets complexes ou évolutifs, pour lesquels il est crucial de pouvoir ajuster le tir en cours de route sans compromettre la qualité finale.',
    ],
  },
  {
    title: 'À la pointe des technologies numériques',
    paragraphs: [
      'Grâce à une veille technologique constante, je reste à jour des dernières innovations.',
      ' Je développe principalement des projets avec Bubble.io, une plateforme de programmation visuelle qui accélère le développement sans compromettre la qualité. Sa flexibilité et sa fiabilité garantissent des solutions performantes.',
    ],
    tools: true,
  },
  {
    title: `Votre plateforme web sur${nbsp}mesure`,
    paragraphs: [
      `Le numérique est essentiel à la gestion d’une entreprise, encore faut-il avoir des outils efficaces. Trouver une solution standard parfaitement adaptée peut être difficile, c’est pourquoi je me suis spécialisé dans le développement sur-mesure${nbsp}:`,
      'Intranet, extranet, outil métier, simulateur web, ERP, CRM, plateforme de gestion RH, application mobile…',
      'Quel que soit votre problématique, une solution adaptée peut être créée.',
      'Chaque aspect du développement, du design UI/UX aux fonctionnalités techniques, est soigneusement étudié pour garantir une expérience utilisateur optimale et répondre à vos besoins spécifiques.',
    ],
    italic: [1],
  },
  {
    title: `Solutions de gestion (ERP${nbsp}/${nbsp}CRM)`,
    paragraphs: [
      'Les ERP permettent de gérer l\'ensemble des processus opérationnels d\'une entreprise, mais les solutions existantes peuvent s’avérer limitées pour votre activité.',
      'Le développement d’un ERP sur-mesure devient alors crucial.',
      'De même, un CRM personnalisé optimise les interactions clients et prospects, facilitant le travail des équipes commerciales et marketing.',
      'Fort de mon expérience, je suis en mesure de vous conseiller et de développer des solutions répondant à vos besoins spécifiques.',
    ],
  },
  {
    title: 'Optimisez votre communication interne et externe',
    paragraphs: [
      'Chaque entreprise a des besoins spécifiques en matière de gestion de l\'information et de collaboration.',
      'Un intranet sur-mesure permet de centraliser les ressources internes, de faciliter la communication entre les équipes, et d\'améliorer l\'efficacité des processus quotidiens.',
      'Pour les interactions avec vos partenaires ou clients, un extranet personnalisé offre une interface sécurisée et accessible, idéale pour partager des informations sensibles ou collaborer sur des projets communs.',
      'Je conçois ces outils en fonction des particularités de votre organisation, pour une gestion fluide et sécurisée de vos échanges.',
    ],
  },
  {
    title: 'Des outils interactifs pour vos utilisateurs',
    paragraphs: [
      'Un simulateur en ligne est un outil puissant qui permet à vos utilisateurs de visualiser des résultats personnalisés en fonction de données spécifiques.',
      'Que ce soit pour calculer des devis, simuler des scénarios, ou estimer des coûts, un simulateur en ligne sur-mesure s\'adapte à vos besoins précis.',
      'Je développe ces outils interactifs pour offrir une expérience utilisateur fluide et engageante, tout en assurant une précision et une fiabilité optimales.',
      'Ce type de solution contribue à renforcer la satisfaction client en leur fournissant des réponses immédiates et adaptées à leurs attentes.',
    ],
  },
  {
    title: 'API et interconnexion sur mesure',
    paragraphs: [
      'Une API permet d\'interconnecter des logiciels pour une gestion optimisée des données.',
      'Mon approche "API first" et mon expertise en intégration vous garantissent des solutions sur-mesure parfaitement adaptées à votre écosystème.',
    ],
  },
]

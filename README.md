# martinblevy.com

Portfolio de Martin B. Levy, reconstruit avec [Nuxt](https://nuxt.com) en génération statique (SSG).
Les contenus (projets, outils, playground) viennent de Baserow et sont lus **uniquement au build**.

## Démarrer

```bash
cp .env.example .env   # puis renseigner les valeurs
npm install
npm run dev            # http://localhost:3000
```

## Build et déploiement

```bash
npm run build          # pages prérendues + une fonction serveur pour /api/contact
```

Le build prérend toutes les pages (`/`, `/services`, `/projets`, `/pl4ygr0und`, `/contact`, chaque `/projet/<slug>`,
`/sitemap.xml`) et les réponses JSON des contenus. Seule la route `POST /api/contact` reste dynamique.

Sur Netlify (ou Vercel), Nuxt détecte la plateforme et choisit le bon preset : commande `npm run build`,
rien d'autre à configurer.

### Variables d'environnement

| Variable                | Quand    | Rôle                                                      |
| ----------------------- | -------- | --------------------------------------------------------- |
| `TOKEN_BASEROW`         | build    | Lecture des tables Baserow (projets, outils, playground)  |
| `CONTACT_WEBHOOK_URL`   | runtime  | Webhook n8n qui reçoit le formulaire de contact           |
| `CONTACT_WEBHOOK_TOKEN` | runtime  | Envoyé en `Authorization: Bearer …` au webhook (optionnel) |

Aucun secret n'arrive dans le navigateur : Baserow et n8n ne sont appelés que côté serveur.

### Mettre à jour les contenus

Le site étant statique, une modification dans Baserow n'apparaît qu'après un nouveau build. Le plus simple :
créer un *build hook* sur l'hébergeur et l'appeler depuis n8n (ou un bouton Baserow) après chaque modification.

### Formulaire de contact

`POST /api/contact` envoie au webhook un body JSON :

```json
{ "name": "", "email": "", "phone": "", "company": "", "type": ["Site vitrine"], "description": "" }
```

Le workflow n8n doit lire ces champs dans le **body** (l'ancienne version Weweb les passait en query string).

## Structure

- `app/pages/[[section]].vue` : la page unique et ses quatre calques (services, projets, pl4ygr0und, contact).
  Une seule instance est gardée entre les URLs pour que les calques glissent.
- `app/pages/projet/[slug].vue` : la fiche d'un projet.
- `shared/utils/site.ts` : réglages du site, position des calques, réseaux, couleurs du playground.
- `server/utils/baserow.ts` : lecture et mise en forme des tables Baserow.

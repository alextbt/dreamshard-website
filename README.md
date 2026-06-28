# DreamShard — Website

Site vitrine du développement de [DreamShard](https://dreamshard-website.alextabet04.workers.dev), un 2D-HD RPG en pixel art.

## Stack

- [Next.js](https://nextjs.org) (App Router, export statique)
- [Tailwind CSS v4](https://tailwindcss.com)
- Déployé sur Cloudflare Workers (Static Assets)

## Développement

```bash
npm install
npm run dev
```

Le site est éditable depuis [app/page.tsx](app/page.tsx).

## Build & déploiement

```bash
npm run build      # génère l'export statique dans out/
npm run deploy:cf   # build + déploiement sur Cloudflare Workers
npm run preview:cf  # build + aperçu local via wrangler
```

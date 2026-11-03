# Deploy info: `https://havbank.net`

Auto-generated from Coolify state. Edit by hand if Coolify config changes,
or regenerate from `~/projects/github/www/CLAUDE.md` instructions.

|                        |                                                            |
| ---------------------- | ---------------------------------------------------------- |
| **Production URL**     | https://havbank.net                                        |
| **GitHub repo**        | `Robinwil/HavBank.net`                                     |
| **Branch tracked**     | `main`                                                     |
| **Coolify panel**      | https://panel.r01.no/applications/wrhw53n5bd1rbyuj1x49puqd |
| **Coolify app uuid**   | `wrhw53n5bd1rbyuj1x49puqd`                                 |
| **Build pack**         | `dockerfile`                                               |
| **Container port**     | `3000`                                                     |
| **Persistent storage** | none (stateless)                                           |

## What's live

HavBank isn't a bank site any more. `serve.js` routes everything:

- `/` and `/om-prosjektet`: the public statement, indexable, and the only pages in `sitemap.xml`.
- `/demo/*`: the old site, shared by hand. It's not linked from `/` or in the sitemap. Every response
  has `X-Robots-Tag: noindex`, and `robots.txt` must not disallow it or crawlers can't see that.
- Old URLs (`/login`, `/privat/...`): `301` to `/`. Other unknown paths: `404`. `/health`: `200`.
- Native form submits on `/demo` are blocked by CSP (`form-action 'none'`) on top of `preventDefault`.
- Any new indexable path has to be added to `INDEXABLE` in `serve.js`; the default is noindex.
- Routes in `src/routes/demo` link with a literal `/demo/...`. There's no `paths.base`, because that
  would move `/` and `/om-prosjektet` under `/demo` too.
- The text under the headline on `/` is copied word for word from `/om-prosjektet`.

`fleet-uptime` checks `https://havbank.net/`. The site stays off the r01.no lists.

## Env vars (production)

NIXPACKS_NODE_VERSION (obsolete since the dockerfile migration, safe to remove in Coolify)

## Deploy

A push to `origin/main` triggers an automatic build + redeploy via
Coolify's GitHub webhook.

To force a redeploy without pushing:

```bash
set -a && . ~/projects/ai/coolify-migration/.env && set +a
curl -H "Authorization: Bearer $COOLIFY_R01_TOKEN" \
  "$COOLIFY_R01_URL/api/v1/deploy?uuid=wrhw53n5bd1rbyuj1x49puqd"
```

## Local dev

# Dev locally (most are SvelteKit / Bun):

bun install
bun run dev # or `npm run dev` if no bun.lock

# Build like Coolify does requires nixpacks CLI; usually not needed locally.

## Logs

```bash
ssh r01 'docker logs --tail 100 -f $(docker ps --filter "name=wrhw53n5bd1rbyuj1x49puqd" --format "{{.Names}}" | head -1)'
```

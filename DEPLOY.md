# Deploy info — `https://havbank.net`

Auto-generated from Coolify state. Edit by hand if Coolify config changes,
or regenerate from `~/projects/github/www/CLAUDE.md` instructions.

| | |
|---|---|
| **Production URL** | https://havbank.net |
| **GitHub repo** | `Robinwil/HavBank.net` |
| **Branch tracked** | `main` |
| **Coolify panel** | https://panel.r01.no/applications/wrhw53n5bd1rbyuj1x49puqd |
| **Coolify app uuid** | `wrhw53n5bd1rbyuj1x49puqd` |
| **Build pack** | `nixpacks` |
| **Container port** | `3000` |
| **Persistent storage** | none (stateless) |

## Env vars (production)

NIXPACKS_NODE_VERSION

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
bun run dev              # or `npm run dev` if no bun.lock
# Build like Coolify does requires nixpacks CLI; usually not needed locally.

## Logs

```bash
ssh r01 'docker logs --tail 100 -f $(docker ps --filter "name=wrhw53n5bd1rbyuj1x49puqd" --format "{{.Names}}" | head -1)'
```

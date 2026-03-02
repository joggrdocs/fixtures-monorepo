# Deploy Command

Deploy the TaskFlow application to the staging or production environment.

## Pre-deploy Checks

1. Run `pnpm typecheck` to verify no type errors
2. Run `pnpm build` to ensure all packages build successfully
3. Check that the current branch is clean (`git status`)
4. Verify the branch is up to date with remote (`git pull --dry-run`)

## Staging Deploy

```bash
# Build all packages
pnpm build

# Deploy API to staging
cd apps/api && npx railway up --environment staging

# Deploy web to staging
cd apps/web && npx vercel --env preview
```

## Production Deploy

```bash
# Ensure we're on the main branch
git checkout main
git pull origin main

# Build and deploy
pnpm build
cd apps/api && npx railway up --environment production
cd apps/web && npx vercel --prod
```

## Post-deploy

- Verify health endpoint: `curl https://api.taskflow.dev/api/health`
- Check the web app loads correctly
- Monitor error rates for 15 minutes after deploy

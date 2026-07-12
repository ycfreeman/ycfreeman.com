# ycfreeman.com

Personal blog built with Next.js and deployed as static assets on Cloudflare.

# Changes from the original template

- added a Gallery component using fancyapp / fancybox
- `tag-data` now uses generated allBlogs code directly as opposed to needing to generate a `tag-data.json` file, so it updates properly on hot reload
  - I will open a PR for this and contribute back to the original repo
- use pnpm as opposed to yarn
  - just because
- added `remark-emoji`
  - fixes this 7+ year broken emoji issue just by adding a package
- finish with an AI generated logo

## Cloudflare deployment

The site is exported as static HTML and deployed with Cloudflare Workers Static
Assets. Wrangler uploads the `out` directory without a Worker script, so page
requests do not consume Worker CPU time. Content Collections generates the MDX
content at build time.

Run a local Cloudflare static-assets preview with:

```bash
pnpm cf:preview
```

For a manual deployment, authenticate Wrangler and run:

```bash
pnpm wrangler login
pnpm cf:deploy
```

Pushes to `main` deploy through
[`deploy-cloudflare.yml`](.github/workflows/deploy-cloudflare.yml). Configure
these secrets in the repository's `production` environment:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`, scoped to the target account with Workers Scripts Write

The initial deployment uses a `workers.dev` URL. Verify it before attaching
`ycfreeman.com` as a Worker Custom Domain. Do not commit Cloudflare credentials
or local `.dev.vars` files.

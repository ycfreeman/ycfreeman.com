another round of modernisation

these days edge hosting like vercel has a very generous free tier, may as well utilising it and go back to server pages for more flexibilty, instead of having to resort to static site generation

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

The site is built for Cloudflare Workers with
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare/) and deployed
with Wrangler.

Run a local Workers preview with:

```bash
pnpm cf:preview
```

For a manual deployment, authenticate Wrangler and run:

```bash
pnpm wrangler login
pnpm cf:deploy
```

The OpenNext incremental cache uses the `ycfreeman-com-cache` R2 bucket. Although
the content is generated at build time, OpenNext stores the prerendered MDX HTML
in this cache. Without it, Cloudflare must render MDX at runtime, which Workers
rejects because the current MDX renderer generates code from strings.

Create the bucket once before the first deployment:

```bash
pnpm wrangler r2 bucket create ycfreeman-com-cache
```

Pushes to `main` deploy through
[`deploy-cloudflare.yml`](.github/workflows/deploy-cloudflare.yml). Configure
these secrets in the repository's `production` environment:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`, scoped to the target account with Workers Scripts
  Write and Workers R2 Storage Write

The initial deployment uses a `workers.dev` URL. Verify it before attaching
`ycfreeman.com` as a Worker Custom Domain. Do not commit Cloudflare credentials
or local `.dev.vars` files.

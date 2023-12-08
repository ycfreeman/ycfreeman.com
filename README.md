ok it's another round of modernisation

these days edge hosting like vercel has a very generous free tier, may as well utilising it and go back to server pages, instead of having to resort to static site generation

# Changes from the original template
- added a Gallery component using fancyapp / fancybox
- `tag-data` now uses generated allBlogs code directly as opposed to needing to generate a `tag-data.json` file, so it updates properly on hot reload
  - will open up a PR for this and contribute back to the original repo
- use pnpm as opposed to yarn
  - just because

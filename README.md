# canozo.github.io

## Running

Install dependencies:

```sh
pnpm install
```

Build the Tailwind stylesheet:

```sh
pnpm build
```

Or rebuild automatically while editing:

```sh
pnpm dev
```

Then serve the site:

```sh
pnpm dlx live-server
```

## Tailwind

Tailwind's source file is `src/input.css`; the compiled output goes to
`dist/output.css`. The build output is generated on demand and is not committed.

## Deployment

Pushes to `main` are built and deployed to GitHub Pages by
`.github/workflows/deploy.yml`. The workflow runs `pnpm build` and publishes
only the site files (`index.html`, `style.css`, `paul-allens-card.js`, and the
built `dist/output.css`), so no build output needs to be committed.

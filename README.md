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

## Theme

Colors and typography are defined as Tailwind theme variables in
`src/input.css`:

| Token                       | Value     |
| --------------------------- | --------- |
| `--color-background`        | `#25201F` |
| `--color-primary`           | `#1BB426` |
| `--color-foreground`        | `#FDF9E8` |
| `--color-foreground-muted`  | `#BCB8AC` |
| `--color-foreground-subtle` | `#9C978E` |

The site uses JetBrains Mono through Google Fonts. To change fonts, update
`--font-mono` in `src/input.css` and the Google Fonts link in `index.html`.

## Deployment

Pushes to `main` are built and deployed to GitHub Pages by
`.github/workflows/deploy.yml`. The workflow runs `pnpm build` and publishes
only the site files (`index.html`, `style.css`, `paul-allens-card.js`, and the
built `dist/output.css`), so no build output needs to be committed.

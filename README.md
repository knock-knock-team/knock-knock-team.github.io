# knock-knock

Studio site: software, ML, infrastructure.

## Development

```bash
npm install
npm run dev
```

Build: `npm run build` (output in `dist/`).

## Content

All copy lives in `src/content.ts`:

- `services` — what we offer;
- `cases` — solved case studies: add an object to the array and the "cases" section renders it automatically;
- `contacts` — telegram / github / email.

The hero code window cycles through snippets defined in `src/snippets.ts`.

## Docker

```bash
docker build -t knock-knock-site .
docker run -p 8080:80 knock-knock-site
```

or `docker compose up --build` — the site will be at `http://localhost:8080`.

## GitHub Pages

Push the `main` branch to GitHub. The workflow in
`.github/workflows/deploy-pages.yml` builds and deploys the site automatically.

The organization site is published at:

`https://knock-knock-team.github.io/`

The workflow also supports project Pages automatically if the repository uses
a different name.

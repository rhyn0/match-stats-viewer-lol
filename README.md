# Match Stats Viewer for League of Legends

Similar to my [Valorant one](https://github.com/rhyn0/match-stats-viewer) but for League. Hopefully to build a viewer of statistics and cool graphs to highlight performances of players.

## Getting Started 

Get the database setup to have something to view.

> [!IMPORTANT]
> The auto [seeding](https://orm.drizzle.team/docs/seed-overview) of [Drizzle Kit](https://orm.drizzle.team/kit-docs)  won't generate our data model exactly. But good enough to create fake views.

```shellscript
cd docker
docker compose up --build -d
# this starts a libsql server at http://localhost:8080
# I love NextJS .env files :)
cd ..
cp .env.template .env.development.local
# Fill in the 'TURSO_DATABASE_URL' value with http://localhost:8080
$EDITOR .env.development.local
# Seed values into your local database
pnpx tsx ./scripts/seed-db.ts
```

Finally, run the development server:

```bash
pnpm dev
```

> [!NOTE]
> It should not be necessary to fill out anything else in  the dotenv.
The Auth specific variables are not required to run, and any auth specific code (`middleware.ts`) can be commented out, if need be.

<details>
    <summary><strong>Common Errors</strong></summary>

    1. Invalid process.env Data
        - I apologize in advance but the .env files are named a **VERY** specific value. See `./src/config/env.ts` for that.
    1. ERR_SSL_PACKET_LENGTH_TOO_LONG
        - Make sure your dtabase URL uses `http` transport not `libsql`.
</details>

## Packages Used

This project uses a LibSQL database to store the data and model the data.

To connect I use:

-   [Drizzle](https://orm.drizzle.team/)

UI components by:
-   [Shadcn](https://ui.shadcn.com/)

Data validation (for uploads and config):
-   [Arktype](https://arktype.io/)

### Database Host

Happily using [Turso](https://turso.tech/) for a distributed and replicated SQL database near the edge.

## Node Version Management

The [`.nvmrc`](./.nvmrc) references a version of **NodeJS** that this project uses. At this moment the contents are a loosely pinned to latest LTS version. It is suggested to enforce a stricter pin after cloning.

## Code Quality

A recommended install would be to add `@biomejs/biome` to your `devDependencies`. `pnpm i -D @biomejs/biome`. The config for it lives in [`biome.json`](./biome.json).

Biome is a linter and formatter written in Rust - so it is quite speedy.

### Pre-Commit

Code quality is upheld by using git's pre-commit hooks - `husky` is the recommendation. By installing these, the linting formatting and static analysis tools that are pre-configured will be run on every commit. And to escape them on a specific commit, one can git commit -m "hacky commit" --no-verify.

To install: `pnpm add -D husky`

To setup the hook: `pnpx husky init`

More info [here](https://typicode.github.io/husky/get-started.html).

### Testing

Love to have [vitest](https://vitest.dev/) in the stack. Made easy with coverage reporting from [istanbul](https://istanbul.js.org/)
Tests are centralized in the `testing/` folder, just as a personal preference.

To run the current tests: `pnpm test`

## CI / GitHub Actions

Highly recommend to configure these, to use your runtime/package manager of choice. `ci.yaml` runs `lint` command and `lint:types` which I usually configure to `tsc --noEmit`.

## Environment Variables

Most frameworks nowadays have ways of loading a `.env` file into runtime for Environment variables. Or can install [dotenv](https://www.npmjs.com/package/dotenv). I usually have some custom rules in [`.gitignore`](.gitignore) to ignore all suffixed `.env` files except a `.env.template` where I have the names and can put fake values to make cloning and getting started easier.
# Match Stats Viewer for League of Legends

Similar to my [Valorant one](https://github.com/rhyn0/match-stats-viewer) but for League. Hopefully to build a viewer of statistics and cool graphs to highlight performances of players.

## Getting Started 

First, run the development server:

```bash
pnpm dev
```

Then, configure access to a LibSQL database. For the ease of startup a `docker-compose.yaml` is provided in the `./docker` folder.
Then additionally use [Drizzle Kit](https://orm.drizzle.team/kit-docs) to initialize the schema. To start the dockerized database:

```bash
docker compose -f docker/docker-compose.yaml up --build --detach
# test with Turso CLI that you can connect
# turso db shell http://localhost:8080
# if using nvm
# nvm use

# setup the .env.local file
# cp .env.template .env.local
pnpm push
```

## Packages Used

This project uses a LibSQL database to store the data and model the data.

To connect I use:

-   [Turso](https://docs.turso.tech/sdk/ts/quickstart)
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
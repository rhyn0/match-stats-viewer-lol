# Match Stats Viewer for League of Legends
Similar to my [Valorant one](https://github.com/rhyn0/match-stats-viewer) but for League. Hopefully to build a viewer of statistics and cool graphs to highlight performances of players.

## Node Version Management

The [`.nvmrc`](./.nvmrc) references a version of **NodeJS** that this project uses. At this moment the contents are a loosely pinned to latest LTS version. It is suggested to enforce a stricter pin after cloning.

## Code Quality

A recommended install would be to add `@biomejs/biome` to your `devDependencies`. `pnpm i -D @biomejs/biome`. The config for it lives in [`biome.json`](./biome.json).

Biome is a linter and formatter written in Rust - so it is quite speedy.

## Pre-Commit

Code quality is upheld by using git's pre-commit hooks - `husky` is the recommendation. By installing these, the linting formatting and static analysis tools that are pre-configured will be run on every commit. And to escape them on a specific commit, one can git commit -m "hacky commit" --no-verify.

To install: `pnpm add -D husky`

To setup the hook: `pnpx husky init`

More info [here](https://typicode.github.io/husky/get-started.html).

## CI / GitHub Actions

Highly recommend to configure these, to use your runtime/package manager of choice. `ci.yaml` runs `lint` command and `lint:types` which I usually configure to `tsc --noEmit`.

## Environment Variables

Most frameworks nowadays have ways of loading a `.env` file into runtime for Environment variables. Or can install [dotenv](https://www.npmjs.com/package/dotenv). I usually have some custom rules in [`.gitignore`](.gitignore) to ignore all suffixed `.env` files except a `.env.template` where I have the names and can put fake values to make cloning and getting started easier.
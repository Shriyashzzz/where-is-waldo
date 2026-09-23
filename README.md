# Where's Waldo

A full-stack "Where's Waldo?" game with multiple difficulty levels. Character
coordinates are verified server-side (not trusting the client with the
answers :p), player progress is tracked per-session, and a leaderboard stores
completion times per level.

**Live demo:** [Play!](https://focused-harmony-production-fbd2.up.railway.app/)

## Preview

![HomePage](./preview/homePreview.png)
![Game Page](./preview/gamePreview.png)
![Mobile Page](./preview/mobilePreview.png)

# To run this locally

_PS: fill up the .env file by referencing .env.example for both server and client side before running the build locally_
_make sure to connect your postgres db with **ipv4 pool url** and **migrate & seed** character's coordinate_

```bash
cd waldo-server
npx prisma migrate dev --name init_tables
npx prima db seed
```

**After migrating & seeding in-order**

```bash
cd ..
npm run dev
```

## How it works

- Pick a level (Easy, Medium, Hard, God) and click where you think a
  character is hiding.
- Every click is sent to the server, which checks it against the real
  coordinates stored in the database — the client never has access to the
  answers, so there's no way to cheat by inspecting network requests or
  client code.
- Each visitor gets an isolated game session via a signed cookie, so
  progress (which characters you've found so far) is tracked per-player
  and never leaks between simultaneous players. Currently uses server-memory but would like to use an simple connect-pg-session table that I can clean every few weeks.
- Once every character on a level is found, you can submit your time to
  that level's leaderboard.

## Project structure

This is a monorepo with two packages:

```
where-is-waldo/
├── waldo-client/   # Frontend
└── waldo-server/   # Backend API
```

## Tech stack

**Server (`waldo-server`)**

- Node.js + Express, written in TypeScript
- Prisma ORM with PostgreSQL
- `express-session` for per-visitor, cookie-based session state
- `express-validator` for request validation
- Jest + Supertest/SuperAgent for integration testing
- Compiled with `tsc`, transformed for tests via SWC (`@swc/jest`)

**Client (`waldo-client`)**

- See `waldo-client/` for setup — talks to the server API for coordinate
  checks and leaderboard data.
- React with Typescript
- Radix UI for general componenets
- Zustand for state management
- React Timer Hook lib for stopwatch
- Highlight Effect made by Forking and updating tailwind-highlights for v4 compatibility,[tailwind-highlights-v4!](https://www.npmjs.com/package/tailwindcss-highlights-v4)

## Getting started

### Prerequisites

- Node.js
- A PostgreSQL database

### Server setup

```bash
cd waldo-server
npm install
```

Create a `.env` file in `waldo-server/` with:

```
ENV = "PROD" Or "DEV"
PORT = Port you want your backend running on. eg: 8080
DATABASE_URL=postgresql://user:password@localhost:5432/waldo
SESSION_SECRET=some-long-random-string
```

Run database migrations (Prisma):

```bash
npx prisma migrate dev
```

Start the dev server:

```bash
npm run dev
```

Run the test suite:

```bash
npm test
```

Build for production:

```bash
npm run build
npm start
```

### Client setup

```bash
cd waldo-client
npm install
npm run dev
```

## API overview

| Method | Route                                      | Description                                   |
| ------ | ------------------------------------------ | --------------------------------------------- |
| POST   | `/api/games/:index/click`                  | Submit a click; validated against real coords |
| GET    | `/api/games/:index/leaderBoard/highScores` | Fetch the leaderboard for a level             |
| POST   | `/api/games/:index/leaderBoard/postScore`  | Submit a completion time (all found first)    |

`:index` refers to the game's index (0 = Easy, 1 = Medium, 2 = Hard, 3 = God).

## Session-based progress tracking

Player progress is scoped per-visitor using signed session cookies
(`express-session`) rather than a single shared in-memory object, so
concurrent players never see or affect each other's found-character state.
Session data currently lives in server memory (`MemoryStore`)

## Testing

The server test suite uses Jest with Supertest, and `request.agent(...)` is
used wherever a test needs to simulate one continuous browser session across
multiple sequential requests (e.g. finding several characters in a row before
checking `allFound`).

## Please use your local db for leaderboard testing, as it wipes all of your leaderboard stats to run tests.

```bash
cd waldo-server
npm test
```

## License

ISC

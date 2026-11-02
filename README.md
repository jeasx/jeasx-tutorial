# My Books – a Jeasx tutorial app

A small reading list app built with [Jeasx](https://www.jeasx.dev), showing server-side rendering with JSX, file-based routing, guards, forms, cookies and a JSON API.

Visitors can browse books and filter them by status. After logging in, an admin can add books, change their status and delete them.

## Getting started

Requires Node.js (LTS).

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Environment variables

Settings are read from `.env`:

| Variable         | Purpose                                      |
| ---------------- | -------------------------------------------- |
| `ADMIN_PASSWORD` | Password for the admin area at `/admin`      |
| `COOKIE_SECRET`  | Secret used to sign the login cookie         |

Change both values before deploying anywhere.

## Scripts

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start the dev server with hot reload       |
| `npm run build` | Build the app into `dist`                  |
| `npm start`     | Run the built app                          |
| `npm run clean` | Remove build output                        |

## Routes

| URL               | File                          | Description                                  |
| ----------------- | ----------------------------- | -------------------------------------------- |
| `/`               | `src/[index].jsx`             | Book list, filterable via `?status=`         |
| `/books/:id`      | `src/books/[...path].jsx`     | Book details with cover and Open Library data |
| `/api/books.json` | `src/api/[books.json].js`     | All books as JSON (CORS enabled)             |
| `/health`         | `src/[health].json`           | Health check used by Docker                  |
| `/admin`          | `src/admin/[index].jsx`       | Add, update and delete books (login required) |
| `/admin/login`    | `src/admin/[login].jsx`       | Login form                                   |
| `/admin/logout`   | `src/admin/[logout].js`       | Logout (POST only)                           |
| anything else     | `src/[404].jsx`               | Not found page                               |

## Project structure

```
src/
  [...guard].js        Runs before every route, exposes request/reply to components
  admin/[...guard].js  Protects /admin with a signed cookie
  components/          Shared JSX components (Layout)
  lib/books.js         In-memory book store
  browser/             Client-side JS and CSS, bundled for the browser
public/                Static files served as-is
jeasx.config.js        esbuild and Fastify configuration
```

Books are kept in memory, so changes are lost when the server restarts.

## Docker

```bash
docker build -t jeasx-tutorial .
docker run -p 3000:3000 --env-file .env jeasx-tutorial
```

## Learn more

See the Jeasx documentation at <https://www.jeasx.dev>.

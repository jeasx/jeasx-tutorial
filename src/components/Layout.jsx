import { html } from "jsx-async-runtime";

/**
 * @param {{ title: string, children?: JSX.Element }} props
 */
export default function Layout({ title, children }) {
  return (
    <>
      {html("<!DOCTYPE html>")}
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title} | Reading List</title>
          <link rel="stylesheet" href={`/index.css?v=${process.env.BUILD_ID}`} />
          <script type="module" src={`/index.js?v=${process.env.BUILD_ID}`}></script>
        </head>
        <body>
          <header>
            <a href="/" class="logo">
              📚 Reading List
            </a>
            <nav>
              <NavLink href="/">Books</NavLink>
              <NavLink href="/admin">Admin</NavLink>
            </nav>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </>
  );
}

/**
 * @this {import("../types").ThisContext}
 * @param {{ href: string, children: JSX.Element }} props
 */
function NavLink({ href, children }) {
  const active = this.request.path === href;
  return (
    <a href={href} aria-current={active ? "page" : undefined}>
      {children}
    </a>
  );
}

import { createHash, timingSafeEqual } from "node:crypto";
import Layout from "../components/Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request, reply }) {
  let error = "";

  if (request.method === "POST") {
    const { password } = /** @type {Record<string, string>} */ (request.body ?? {});

    if (isValidPassword(password)) {
      reply.setCookie("user", "admin", {
        path: "/admin",
        signed: true, // Signed with COOKIE_SECRET, so it can't be faked.
        httpOnly: true, // Not readable by JavaScript in the browser.
        sameSite: "lax", // Not sent with forms posted from other sites.
        secure: "auto", // Only sent via HTTPS, if the site uses HTTPS.
        maxAge: 60 * 60 * 8, // Log out automatically after 8 hours.
      });
      return reply.redirect("/admin", 303);
    }

    reply.status(401);
    error = "Wrong password, please try again.";
  }

  return (
    <Layout title="Log in">
      <h1>Log in</h1>
      {error && <p class="error">{error}</p>}
      <form method="post" class="card">
        <label>
          Password <input type="password" name="password" required autofocus />
        </label>
        <button class="primary">Log in</button>
      </form>
    </Layout>
  );
}

/**
 * Compare in constant time, and never accept a login if no password is configured.
 * @param {unknown} password
 */
function isValidPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== "string") {
    return false;
  }
  // Hash both sides so they have equal length, as timingSafeEqual requires.
  const hash = (/** @type {string} */ value) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(password), hash(expected));
}

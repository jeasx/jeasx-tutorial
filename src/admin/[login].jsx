import Layout from "../components/Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request, reply }) {
  let error = "";

  if (request.method === "POST") {
    const { password } = /** @type {Record<string, string>} */ (request.body);

    if (password === process.env.ADMIN_PASSWORD) {
      reply.setCookie("user", "admin", {
        path: "/admin",
        signed: true, // Signed with COOKIE_SECRET, so it can't be faked.
        httpOnly: true, // Not readable by JavaScript in the browser.
        sameSite: "lax", // Not sent with forms posted from other sites.
        secure: "auto", // Only sent via HTTPS, if the site uses HTTPS.
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

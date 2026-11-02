/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request, reply }) {
  // Only log out via the form, not by simply opening the URL.
  if (request.method !== "POST") {
    return;
  }

  reply.clearCookie("user", { path: "/admin" });
  return reply.redirect("/", 303);
}

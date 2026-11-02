/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request, reply }) {
  // The login page must be reachable without being logged in.
  if (request.path === "/admin/login") {
    return;
  }

  // Only accept the cookie if its signature is valid, so nobody can fake it.
  const { valid, value } = request.unsignCookie(request.cookies.user ?? "");
  if (!valid) {
    return reply.redirect("/admin/login", 303);
  }

  // Objects returned by a guard are passed as props to all routes below.
  return { user: value };
}

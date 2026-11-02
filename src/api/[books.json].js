import { getBooks } from "../lib/books";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ reply }) {
  reply.header("Access-Control-Allow-Origin", "*");
  return getBooks();
}

import Layout from "./components/Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function ({ request }) {
  return (
    <Layout title="Not found">
      <h1>Not found</h1>
      <p>Sorry, there is nothing at {request.path}.</p>
      <a href="/">Back to my books</a>
    </Layout>
  );
}

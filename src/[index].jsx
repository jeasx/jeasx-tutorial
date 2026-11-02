import Layout from "./components/Layout";
import { getBooks, STATUS } from "./lib/books";

/**
 * @param {import("./types").RouteProps} props
 */
export default function ({ request }) {
  const status = request.query["status"];
  const books = getBooks().filter((book) => !status || book.status === status);

  return (
    <Layout title="My books">
      <h1>My books</h1>
      <p class="filter">
        <a href="/" aria-current={!status ? "page" : undefined}>
          All
        </a>
        {Object.entries(STATUS).map(([key, label]) => (
          <a href={`/?status=${key}`} aria-current={status === key ? "page" : undefined}>
            {label}
          </a>
        ))}
      </p>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul class="books">
          {books.map((book) => (
            <li>
              <a href={`/books/${book.id}`} style={`view-transition-name: book-${book.id}`}>
                {book.title}
              </a>{" "}
              by {book.author} <span class={`badge ${book.status}`}>{STATUS[book.status]}</span>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}

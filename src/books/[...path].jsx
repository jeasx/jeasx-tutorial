import Layout from "../components/Layout";
import { getBook, STATUS } from "../lib/books";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request }) {
  // "/books/2" => 2
  const id = Number(request.path.split("/").at(-1));
  const book = getBook(id);

  // Return nothing, so the request is passed on to the [404] route.
  if (!book) {
    return;
  }

  return (
    <Layout title={book.title}>
      <a href="/">&laquo; All books</a>
      <article class="book">
        <div>
          <h1 style={`view-transition-name: book-${book.id}`}>{book.title}</h1>
          <p>
            by {book.author} <span class={`badge ${book.status}`}>{STATUS[book.status]}</span>
          </p>
          <BookDetails isbn={book.isbn} />
        </div>
        <img src={`https://covers.openlibrary.org/b/isbn/${encodeURIComponent(book.isbn)}-M.jpg`} alt="" width="180" class="cover" />
      </article>
    </Layout>
  );
}

/**
 * @param {{ isbn: string }} props
 */
async function BookDetails({ isbn }) {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?isbn=${encodeURIComponent(isbn)}&fields=first_publish_year,number_of_pages_median,subject&limit=1`,
    );
    const [details] = (await response.json()).docs;
    return (
      <dl>
        <dt>First published</dt>
        <dd>{details.first_publish_year}</dd>
        <dt>Pages</dt>
        <dd>{details.number_of_pages_median}</dd>
        <dt>Subjects</dt>
        <dd>{details.subject?.slice(0, 5).join(", ")}</dd>
      </dl>
    );
  } catch {
    return <p>No details available.</p>;
  }
}

import Layout from "../components/Layout";
import { addBook, deleteBook, getBooks, STATUS, updateStatus } from "../lib/books";

/**
 * @param {import("../types").RouteProps & { user: string }} props
 */
export default function ({ request, reply, user }) {
  if (request.method === "POST") {
    const form = /** @type {Record<string, string>} */ (request.body);

    if (form.action === "delete") {
      deleteBook(Number(form.id));
    } else if (form.action === "status") {
      const id = Number(form.id);
      updateStatus(id, form.status);
      // Jump back to the updated book, so you can see the change.
      return reply.redirect(`/admin?updated=${id}#book-${id}`, 303);
    } else if (form.title?.trim() && form.author?.trim()) {
      addBook({
        title: form.title.trim(),
        author: form.author.trim(),
        isbn: form.isbn?.replaceAll("-", "").trim() ?? "",
        status: form.status in STATUS ? form.status : "to-read",
      });
    } else {
      reply.status(400);
      return <AdminPage user={user} error="Please enter a title and an author." form={form} />;
    }

    // Redirect after POST, so reloading the page doesn't submit the form again.
    return reply.redirect("/admin", 303);
  }

  return <AdminPage user={user} updated={Number(request.query["updated"])} />;
}

/**
 * @param {{ user: string, error?: string, form?: Record<string, string>, updated?: number }} props
 */
function AdminPage({ user, error, form = {}, updated }) {
  const books = getBooks();

  return (
    <Layout title="Admin">
      <h1>Manage books</h1>
      <form method="post" action="/admin/logout" class="logout">
        Logged in as {user}.<button>Log out</button>
      </form>

      <h2>Add a book</h2>
      {error && <p class="error">{error}</p>}
      <form method="post" class="card">
        <label>
          Title <input name="title" value={form.title} required />
        </label>
        <label>
          Author <input name="author" value={form.author} required />
        </label>
        <label>
          ISBN <input name="isbn" value={form.isbn} />
        </label>
        <label>
          Status <StatusSelect value={form.status} />
        </label>
        <button class="primary">Add book</button>
      </form>

      <h2>All books</h2>
      <ul class="books">
        {books.map((book) => (
          <li id={`book-${book.id}`}>
            <span class="title">{book.title}</span>
            <div class="actions">
              {book.id === updated && <span class="saved">✓ Saved</span>}
              <form method="post">
                <input type="hidden" name="action" value="status" />
                <input type="hidden" name="id" value={book.id} />
                <StatusSelect value={book.status} />
                <button>Save</button>
              </form>
              <form method="post" data-confirm={`Delete "${book.title}"?`}>
                <input type="hidden" name="action" value="delete" />
                <input type="hidden" name="id" value={book.id} />
                <button class="danger">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

/**
 * @param {{ value?: string }} props
 */
function StatusSelect({ value }) {
  return (
    <select name="status">
      {Object.entries(STATUS).map(([key, label]) => (
        <option value={key} selected={value === key}>
          {label}
        </option>
      ))}
    </select>
  );
}

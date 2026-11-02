/**
 * @typedef {{ id: number, title: string, author: string, isbn: string, status: string }} Book
 */

export const STATUS = {
  "to-read": "To read",
  reading: "Reading",
  finished: "Finished",
};

// Each route is bundled separately, so a module variable would exist once per route.
// globalThis is shared by all routes and even survives hot reloads during development.
const store = /** @type {{ books?: Book[] }} */ (globalThis);

store.books ??= [
  {
    id: 1,
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    isbn: "9780135957059",
    status: "finished",
  },
  {
    id: 2,
    title: "Refactoring",
    author: "Martin Fowler",
    isbn: "9780134757599",
    status: "reading",
  },
  {
    id: 3,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    isbn: "9781449373320",
    status: "to-read",
  },
];

export function getBooks() {
  return store.books;
}

/**
 * @param {number} id
 */
export function getBook(id) {
  return store.books.find((book) => book.id === id);
}

/**
 * @param {Omit<Book, "id">} book
 */
export function addBook(book) {
  const id = Math.max(0, ...store.books.map((book) => book.id)) + 1;
  store.books.push({ id, ...book });
}

/**
 * @param {number} id
 */
export function deleteBook(id) {
  store.books = store.books.filter((book) => book.id !== id);
}

/**
 * @param {number} id
 * @param {string} status
 */
export function updateStatus(id, status) {
  const book = getBook(id);
  if (book && status in STATUS) {
    book.status = status;
  }
}

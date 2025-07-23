export const fetchBooks = async () => {
  const res = await fetch("http://localhost:8000/api/books/");
  return await res.json();
};

export const fetchGenres = async () => {
  const res = await fetch("http://localhost:8000/api/genres/");
  return await res.json();
};

export const addBook = async (bookData) => {
  const res = await fetch("http://localhost:8000/api/books/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  if (!res.ok) {
    throw new Error("Failed to add book");
  }

  return await res.json();
};

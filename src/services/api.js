export const fetchBooks = async () => {
  const res = await fetch("http://localhost:8000/books/");
  return await res.json();
};

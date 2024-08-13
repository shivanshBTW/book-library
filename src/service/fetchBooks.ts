export const fetchBooks = async () => {
  const url = 'https://my-json-server.typicode.com/cutamar/mock/books';
  const response = await fetch(url);
  console.log('API called');
  return response.json();
};

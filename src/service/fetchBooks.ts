export const fetchBooks = async () => {
  const url = 'https://my-json-server.typicode.com/cutamar/mock/books';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  console.log('API called');
  return response.json();
};

type fetchBookDetailsType = {
  id?: string;
  customBookList?: Array<BookData>;
};

export const fetchBookDetails = async ({
  id,
  customBookList,
}: fetchBookDetailsType) => {
  const customBookData = customBookList?.find((book) => book.id === Number(id));
  if (customBookData) return customBookData;

  const url = `https://my-json-server.typicode.com/cutamar/mock/books/${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  console.log('API called');
  return response.json();
};

import axios from 'axios';

export const fetchBooks = async () => {
  const url = 'https://my-json-server.typicode.com/cutamar/mock/books';
  const response = await axios({
    url,
    method: 'GET',
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  return response?.data || [];
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
  const response = await axios({
    url,
    method: 'GET',
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  return response?.data || {};
};

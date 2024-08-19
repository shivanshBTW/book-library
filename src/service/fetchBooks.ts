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

interface fetchBookDetailsType {
  id?: string;
  customBookData?: BookData;
}

export const fetchBookDetails = async ({
  id,
  customBookData,
}: fetchBookDetailsType) => {
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

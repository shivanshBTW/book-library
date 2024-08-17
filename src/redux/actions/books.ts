export const editBook = (bookData: BookData) => {
  return {
    type: 'EDIT_BOOK',
    payload: bookData,
  };
};

export const addBook = (bookData: BookData) => {
  return {
    type: 'ADD_BOOK',
    payload: bookData,
  };
};

export const deleteBook = (bookData: BookData) => {
  return {
    type: 'DELETE_BOOK',
    payload: bookData,
  };
};

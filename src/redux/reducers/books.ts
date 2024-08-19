interface customBookListType {
  customBookList: BookData[];
}

const initialState: customBookListType = {
  customBookList: [
    {
      id: 199,
      title: 'Harry Potter Custom',
      author: 'JK Rowling',
      description:
        'Added this custom book by default to the list to easily test the functionality',
      cover:
        'https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408855898.jpg',
      publicationDate: '2024-08-30',
      isCustomBook: true,
    },
  ],
};

interface customBookActionType {
  type: string;
  payload: BookData;
}

const booksReducer = (
  state: customBookListType = initialState,
  action: customBookActionType
) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return {
        ...state,
        customBookList: [action.payload, ...state.customBookList],
      };
    case 'EDIT_BOOK':
      return {
        ...state,
        customBookList: state.customBookList.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        customBookList: state.customBookList.filter(
          (book) => book.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default booksReducer;

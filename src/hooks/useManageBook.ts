import { bookModalStateType } from 'src/pages/Home';
import { useDispatch } from 'react-redux';
import { addBook, editBook } from 'src/redux/actions/books';

interface useLikeBookReturn {
  onSubmit: (bookData: BookData) => void;
}

const useManageBook = (
  { type }: bookModalStateType,
  onClose: () => void
): useLikeBookReturn => {
  const dispatch = useDispatch();
  const onEditBook = (bookData: BookData) => {
    dispatch(editBook(bookData));
  };

  const onAddBook = (bookData: BookData) => {
    dispatch(addBook(bookData));
  };

  const onSubmit = (bookData: BookData) => {
    bookData.isCustomBook = true;
    if (type === 'edit') {
      onEditBook(bookData);
    } else {
      bookData.id = new Date().valueOf();
      onAddBook(bookData);
    }
    onClose();
  };
  return { onSubmit };
};

export default useManageBook;

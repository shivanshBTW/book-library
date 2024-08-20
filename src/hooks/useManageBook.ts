import { bookManageModalStateType } from 'src/pages/Home';
import { useDispatch } from 'react-redux';
import { addBook, editBook } from 'src/redux/actions/books';
import { toast } from 'material-react-toastify';
import { useNavigate } from 'react-router-dom';

interface useLikeBookReturn {
  onSubmit: (bookData: BookData) => void;
}

const useManageBook = (
  { type }: bookManageModalStateType,
  onClose: () => void,
  reset: () => void
): useLikeBookReturn => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEditBook = (bookData: BookData) => {
    dispatch(editBook(bookData));
    toast.success('Book edited successfully');
  };

  const onAddBook = (bookData: BookData) => {
    dispatch(addBook(bookData));
    toast.success('Book added successfully');
  };

  const onSubmit = (bookData: BookData) => {
    bookData.isCustomBook = true;
    if (type === 'edit') {
      onEditBook(bookData);
    } else {
      bookData.id = new Date().valueOf();
      onAddBook(bookData);
      navigate(`/books/${bookData.id}`);
    }
    onClose();
    reset();
  };
  return { onSubmit };
};

export default useManageBook;

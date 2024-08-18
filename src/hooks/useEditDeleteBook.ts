import { toast } from 'material-react-toastify';
import { useDispatch } from 'react-redux';
import { bookManageModalStateType } from 'src/pages/Home';
import { deleteBook } from 'src/redux/actions/books';

type useEditDeleteBookReturn = {
  handleEditButtonClicked: () => void;
  handleDelete: () => void;
};

const useEditDeleteBook = (
  bookData: BookData,
  handleBookManageModalOpen: (state: bookManageModalStateType) => void
): useEditDeleteBookReturn => {
  const { id } = bookData;
  const dispatch = useDispatch();

  const handleEditButtonClicked = () => {
    handleBookManageModalOpen({ type: 'edit', bookId: id });
  };

  const handleDelete = () => {
    dispatch(deleteBook(bookData));
    toast.success('Book deleted successfully');
  };

  return { handleEditButtonClicked, handleDelete };
};

export default useEditDeleteBook;

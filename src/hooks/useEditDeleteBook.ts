import { toast } from 'material-react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bookManageModalStateType } from 'src/pages/Home';
import { deleteBook } from 'src/redux/actions/books';

interface useEditDeleteBookProps {
  bookData?: BookData;
  handleBookManageModalOpen: (state: bookManageModalStateType) => void;
  isDetailsPage?: boolean;
  refetch?: () => void;
}

interface useEditDeleteBookReturn {
  handleEditButtonClicked: () => void;
  handleDelete: () => void;
}

const useEditDeleteBook = ({
  bookData,
  handleBookManageModalOpen,
  isDetailsPage,
  refetch,
}: useEditDeleteBookProps): useEditDeleteBookReturn => {
  const { id } = bookData || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditButtonClicked = () => {
    if (id) {
      handleBookManageModalOpen({ type: 'edit', bookId: id });
      if (isDetailsPage && refetch) {
        refetch();
      }
    }
  };

  const handleDelete = () => {
    if (bookData) {
      dispatch(deleteBook(bookData));
      toast.success('Book deleted successfully');
      if (isDetailsPage) {
        navigate('/books');
      }
    }
  };

  return { handleEditButtonClicked, handleDelete };
};

export default useEditDeleteBook;

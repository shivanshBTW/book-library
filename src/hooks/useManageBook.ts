import { bookModalStateType } from 'src/pages/Home';
import { SubmitHandler } from 'react-hook-form';

interface useLikeBookReturn {
  onSubmit: () => void;
}

const useManageBook = ({
  type,
  bookId,
}: bookModalStateType): useLikeBookReturn => {
  const onEditBook = (bookData: BookData) => {
    console.log('edit book', bookData);
  };

  const onAddBook = (bookData: BookData) => {
    console.log('add book', bookData);
  };

  const onSubmit = () => {
    if (editingBook) {
      onEditBook(data);
    } else {
      data.id = new Date().valueOf() * -1;
      onAddBook(data);
    }
  };
  return { onSubmit };
};

export default useManageBook;

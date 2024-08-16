import { bookModalStateType } from 'src/pages/Home';
import { SubmitHandler } from 'react-hook-form';

interface useLikeBookReturn {
  onSubmit: (bookData: BookData) => void;
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

  const onSubmit = (bookData: BookData) => {
    bookData.isCustomBook = true;
    if (type === 'edit') {
      onEditBook(bookData);
    } else {
      bookData.id = new Date().valueOf();
      onAddBook(bookData);
    }
  };
  return { onSubmit };
};

export default useManageBook;

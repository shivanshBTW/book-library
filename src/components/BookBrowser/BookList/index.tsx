import BookCard from 'src/components/BookBrowser/BookCard';
import Button from 'src/components/commonComponents/Button';
import PaginationSelector from 'src/components/commonComponents/Pagination';
import { fetchBooks } from 'src/service/fetchBooks';
import styles from '~/components/BookBrowser/BookList.module.scss';
import usePagination from 'src/hooks/usePagination';
import { useQuery } from '@tanstack/react-query';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { bookManageModalStateType } from 'src/pages/Home';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import BookCardLoader from 'src/components/BookBrowser/BookCard/loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

const { root, cardListContainer, errorContainer } = styles;

interface BookListProps {
  handleBookManageModalOpen: (state: bookManageModalStateType) => void;
}

function BookList({ handleBookManageModalOpen }: BookListProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const itemsPerPage = 5;
  const [likedList, setLikedList] = useLocalStorage<Array<number>>(
    'likedList',
    []
  );

  const customBookList = useSelector(
    (state: RootState) => state?.books?.customBookList || []
  );

  const {
    data: bookList = [],
    isPending,
    error,
    refetch,
  } = useQuery<BookData[]>({
    queryKey: ['fetchBookList'],
    queryFn: fetchBooks,
  });

  const finalList = useMemo(
    () => [...customBookList, ...bookList],
    [customBookList, bookList]
  );

  const paginationState = usePagination({
    itemList: finalList,
    itemsPerPage,
  });

  const { pageItems, isPaginationRequired, goToPage, findItemPage } =
    paginationState;

  useEffect(() => {
    if (location.state?.fromBook) {
      const bookId = location.state?.fromBook;
      const index = finalList.findIndex((book) => book.id == bookId);
      findItemPage(index);
      navigate('/books', { replace: true });
    }
  }, [finalList, findItemPage, goToPage, location, navigate]);

  if (error)
    return (
      <div className={errorContainer}>
        {error?.message || 'Error '}{' '}
        <Button onClick={() => refetch()}>Refresh</Button>
      </div>
    );

  return (
    <div className={root}>
      <div className={cardListContainer}>
        {isPending
          ? Array.from(new Array(5)).map((_, index) => {
              return <BookCardLoader key={index} />;
            })
          : pageItems?.map((bookData) => {
              return (
                <BookCard
                  bookData={bookData}
                  key={bookData?.id}
                  likedList={likedList}
                  setLikedList={setLikedList}
                  handleBookManageModalOpen={handleBookManageModalOpen}
                />
              );
            })}
      </div>

      {isPaginationRequired ? (
        <PaginationSelector<BookData>
          hideFirstLastButtons
          {...paginationState}
        />
      ) : null}
    </div>
  );
}

export default BookList;

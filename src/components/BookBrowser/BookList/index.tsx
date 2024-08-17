import BookCard from 'src/components/BookBrowser/BookCard';
import Button from 'src/components/commonComponents/Button';
import PaginationSelector from 'src/components/commonComponents/Pagination';
import { fetchBooks } from 'src/service/fetchBooks';
import styles from '~/components/BookBrowser/BookList.module.scss';
import usePagination from 'src/hooks/usePagination';
import { useQuery } from '@tanstack/react-query';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { bookModalStateType } from 'src/pages/Home';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

const { root, cardListContainer, errorContainer } = styles;

interface BookListProps {
  handleBookModalOpen: (state: bookModalStateType) => void;
}

function BookList({ handleBookModalOpen }: BookListProps) {
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
    staleTime: Infinity, // 1 hour
    // gcTime: 30 * 60 * 1000, // 30 minutes
  });
  console.log('bookList in comp', bookList);

  const paginationState = usePagination({
    itemList: [...customBookList, ...bookList],
    itemsPerPage,
  });

  const {
    pageItems,
    totalPages,
    currentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    isPaginationRequired,
    isFirstPage,
    isLastPage,
    pageButtonList,
  } = paginationState;

  if (error)
    return (
      <div className={errorContainer}>
        {error?.message || 'Error '}{' '}
        <Button onClick={() => refetch()}>Refresh</Button>
      </div>
    );

  if (isPending) return <div>Loading...</div>;

  return (
    <div className={root}>
      <div className={cardListContainer}>
        {pageItems?.map((bookData) => {
          return (
            <BookCard
              bookData={bookData}
              key={bookData?.id}
              likedList={likedList}
              setLikedList={setLikedList}
              handleBookModalOpen={handleBookModalOpen}
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

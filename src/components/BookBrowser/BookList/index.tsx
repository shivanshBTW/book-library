import BookCard from 'src/components/BookBrowser/BookCard';
import Button from 'src/components/commonComponents/Button';
import PaginationSelector from 'src/components/commonComponents/Pagination';
import { fetchBooks } from 'src/service/fetchBooks';
import styles from '~/components/BookBrowser/BookList.module.scss';
import usePagination from 'src/hooks/usePagination';
import { useQuery } from '@tanstack/react-query';

const { root, cardListContainer, errorContainer } = styles;

function BookList() {
  const itemsPerPage = 5;
  const {
    data: bookList = [],
    isPending,
    error,
    refetch,
  } = useQuery<BookData[]>({
    queryKey: ['fetchBookList'],
    queryFn: fetchBooks,
    // staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
  console.log('bookList in comp', bookList);

  const paginationState = usePagination({ itemList: bookList, itemsPerPage });
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
          return <BookCard bookData={bookData} key={bookData?.id} />;
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

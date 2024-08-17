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
import BookCardLoader from '../BookCard/loader';

const { root, cardListContainer, errorContainer } = styles;

type BookListProps = {
  handleBookModalOpen: (state: bookModalStateType) => void;
};

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
    retry: 2,
    retryOnMount: true,
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  const paginationState = usePagination({
    itemList: [...customBookList, ...bookList],
    itemsPerPage,
  });

  const { pageItems, isPaginationRequired } = paginationState;

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

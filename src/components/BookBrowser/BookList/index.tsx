import Button from 'src/components/commonComponents/Button';
import { fetchBooks } from 'src/service/fetchBooks';
import styles from '~/components/BookBrowser/BookList.module.scss';
import { useQuery } from '@tanstack/react-query';
const { root, errorContainer } = styles;

function BookList() {
  const {
    data = [],
    isPending,
    error,
    refetch,
  } = useQuery<BookData[]>({
    queryKey: ['fetchBookList'],
    queryFn: fetchBooks,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
  console.log('data in comp', data);

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
      {data?.map((bookData) => {
        return <div key={bookData?.id}>{bookData.title}</div>;
      })}
    </div>
  );
}

export default BookList;

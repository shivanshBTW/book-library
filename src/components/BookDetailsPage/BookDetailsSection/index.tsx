import { useNavigate, useParams } from 'react-router-dom';

import BookDetailsPageLoader from 'src/components/BookDetailsPage/BookDetailsSection/loader';
import Button from 'src/components/commonComponents/Button';
import Image from 'src/components/commonComponents/Image';
import { RootState } from 'src/redux/store';
import { fetchBookDetails } from 'src/service/fetchBooks';
import styles from '~/components/BookDetailsPage/BookDetailsSection.module.scss';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const {
  root,
  bookDataContainerStyle,
  coverImageContainerStyle,
  coverImageStyle,
  detailsContainer,
  bookTitleText,
  authorNameText,
  descriptionText,
  dateText,
  errorContainer,
} = styles;

function BookDetailsSection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customBookList = useSelector(
    (state: RootState) => state?.books?.customBookList || []
  );
  const {
    data: bookDetails = {},
    isPending,
    error,
    refetch,
  } = useQuery<BookData>({
    queryKey: [`fetchBookDetails/${id}`],
    queryFn: () => fetchBookDetails({ id, customBookList }),
    retry: 2,
    retryOnMount: true,
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  const handleGoToHomePage = () => {
    navigate('/', { state: { fromBook: id } });
  };

  const { cover, title, author, description, publicationDate } =
    (bookDetails as BookData) || {};

  const date = new Date(publicationDate);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  if (isPending) {
    return <BookDetailsPageLoader />;
  }

  if (error)
    return (
      <div className={errorContainer}>
        {error?.message || 'Error '}{' '}
        <Button onClick={() => refetch()}>Refresh</Button>
      </div>
    );

  return (
    <div className={root}>
      <div className={bookDataContainerStyle}>
        <div className={coverImageContainerStyle}>
          <Image src={cover} alt="cover" className={coverImageStyle} />
        </div>

        <div className={detailsContainer}>
          <div className={bookTitleText}>{title}</div>
          <div className={authorNameText}>by {author}</div>
          <div className={descriptionText}>{description}</div>
          <div className={dateText}>
            {month} {year}
          </div>
          <Button onClick={handleGoToHomePage}>Go Back</Button>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsSection;

import { LuHeart, LuHeartOff, LuPenLine, LuTrash2 } from 'react-icons/lu';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BookDetailsPageLoader from 'src/components/BookDetailsPage/BookDetailsSection/loader';
import Button from 'src/components/commonComponents/Button';
import Image from 'src/components/commonComponents/Image';
import { RootState } from 'src/redux/store';
import { bookManageModalStateType } from 'src/pages/Home';
import clsx from 'clsx';
import { fetchBookDetails } from 'src/service/fetchBooks';
import styles from '~/components/BookDetailsPage/BookDetailsSection.module.scss';
import useEditDeleteBook from 'src/hooks/useEditDeleteBook';
import useLikeBook from 'src/hooks/useLikeBook';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import BookDeleteConfirmationModal from 'src/components/commonComponents/DeleteConfirmationModal';

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
  bookActionsContainer,
  actionButtonStyle,
  likeButtonStyle,
  deleteButtonStyle,
  isLikedStyle,
  heartIconStyle,
  heartOffIconStyle,
  errorContainer,
} = styles;

interface BookListProps {
  handleBookManageModalOpen: (state: bookManageModalStateType) => void;
}

function BookDetailsSection({ handleBookManageModalOpen }: BookListProps) {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const customBookList = useSelector(
    (state: RootState) => state?.books?.customBookList || []
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [likedList, setLikedList] = useLocalStorage<Array<number>>(
    'likedList',
    []
  );

  const customBookData = useMemo(
    () => customBookList?.find((book) => book.id === Number(id)),
    [customBookList, id]
  );

  const {
    data: bookDetails,
    isPending,
    error,
    refetch,
  } = useQuery<BookData>({
    queryKey: [`fetchBookDetails/${id}`],
    queryFn: () => fetchBookDetails({ id, customBookData }),
  });
  const finalBookData = customBookData ? customBookData : bookDetails;

  const { isBookLiked, handleToggleBookLike } = useLikeBook(
    parseInt(id),
    likedList,
    setLikedList
  );

  const { handleEditButtonClicked, handleDelete } = useEditDeleteBook({
    bookData: finalBookData,
    handleBookManageModalOpen,
    refetch,
    isDetailsPage: true,
  });

  const handleGoToHomePage = () => {
    navigate('/books', { state: { fromBook: id } });
  };

  const { cover, title, author, description, publicationDate, isCustomBook } =
    (finalBookData as BookData) || {};

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const onDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

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
            {new Date(publicationDate).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </div>
          <div className={bookActionsContainer}>
            <Button
              className={clsx(actionButtonStyle, likeButtonStyle, {
                [isLikedStyle]: isBookLiked,
              })}
              onClick={handleToggleBookLike}
            >
              <LuHeart
                className={clsx(heartIconStyle, {
                  [isLikedStyle]: isBookLiked,
                })}
              />
              <LuHeartOff
                className={clsx(heartOffIconStyle, {
                  [isLikedStyle]: isBookLiked,
                })}
              />
              &nbsp; Like
            </Button>
            {isCustomBook ? (
              <>
                <Button
                  className={actionButtonStyle}
                  onClick={handleEditButtonClicked}
                >
                  <LuPenLine />
                  &nbsp; Edit
                </Button>
                <Button
                  className={clsx(actionButtonStyle, deleteButtonStyle)}
                  onClick={handleDeleteClick}
                >
                  <LuTrash2 />
                  &nbsp; Delete
                </Button>
              </>
            ) : null}

            <BookDeleteConfirmationModal
              open={isDeleteModalOpen}
              onClose={onDeleteModalClose}
              handleDelete={handleDelete}
            />
          </div>
          <Button onClick={handleGoToHomePage}>Go Back</Button>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsSection;

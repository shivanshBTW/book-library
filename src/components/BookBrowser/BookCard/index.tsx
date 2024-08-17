// I used this library as this supports ES6 imports and tree shaking,
// will take 1.7k if we use the whole library
import {
  LuHeart,
  LuHeartOff,
  LuImageOff,
  LuPenLine,
  LuTrash2,
} from 'react-icons/lu';

import clsx from 'clsx';
import styles from '~/components/BookBrowser/BookCard.module.scss';
import { useState } from 'react';
import useLikeBook from 'src/hooks/useLikeBook';
import { bookModalStateType } from 'src/pages/Home';
import { useDispatch } from 'react-redux';
import { deleteBook } from 'src/redux/actions/books';

const {
  root,
  coverImageContainer,
  coverImage,
  errorImage,
  bookTitleStyle,
  authorNameContainerStyle,
  authorNameStyle,
  buttonGroupContainer,
  actionButtonStyle,
  likeButtonStyle,
  heartIconStyle,
  heartOffIconStyle,
  isLikedStyle,
} = styles;

type BookCardProps = {
  bookData: BookData;
  likedList: number[];
  setLikedList: (likedList: number[]) => void;
  handleBookModalOpen: (state: bookModalStateType) => void;
};

const BookCard: React.FC<BookCardProps> = ({
  bookData,
  likedList,
  setLikedList,
  handleBookModalOpen,
}) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const {
    id,
    title,
    author,
    cover,
    description,
    publicationDate,
    isCustomBook,
  } = bookData;
  const { isBookLiked, handleToggleBookLike } = useLikeBook(
    id,
    likedList,
    setLikedList
  );

  const handleImageError = () => setImageError(true);

  const handleEditButtonClicked = () => {
    handleBookModalOpen({ type: 'edit', bookId: id });
  };

  const handleDeleteClick = () => {
    dispatch(deleteBook(bookData));
  };

  console.log('bookData', bookData);
  return (
    <div className={root}>
      <div>
        <div className={coverImageContainer}>
          {imageError ? (
            <LuImageOff className={errorImage} />
          ) : (
            <img
              src={cover}
              alt={'cover'}
              className={coverImage}
              onError={handleImageError}
            />
          )}
        </div>
        <div className={bookTitleStyle}>{title}</div>
      </div>
      <div>
        <div className={authorNameContainerStyle}>
          by <span className={authorNameStyle}>{author}</span>
        </div>
        <div className={buttonGroupContainer}>
          <div
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
          </div>
          {isCustomBook ? (
            <>
              <div
                className={actionButtonStyle}
                onClick={handleEditButtonClicked}
              >
                <LuPenLine />
              </div>
              <div className={actionButtonStyle} onClick={handleDeleteClick}>
                <LuTrash2 />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BookCard;

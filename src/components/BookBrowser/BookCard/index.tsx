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

const {
  root,
  coverImageContainer,
  coverImage,
  bookTitleStyle,
  authorNameContainerStyle,
  authorNameStyle,
  buttonGroupContainer,
  actionButtonStyle,
  likeButtonStyle,
  likeButtonSelected,
  heartIconStyle,
  heartOffIconStyle,
  isLikedStyle,
} = styles;

interface BookCardProps {
  bookData: BookData;
}

const BookCard: React.FC<BookCardProps> = ({ bookData }) => {
  const {
    title,
    author,
    cover,
    description,
    publicationDate,
    isCustomBook = true,
  } = bookData;

  const [imageError, setImageError] = useState(false);
  const handleImageError = () => setImageError(true);
  console.log('bookData', bookData);

  //   const isLiked = false;
  const isLiked = true;

  return (
    <div className={root}>
      <div>
        <div className={coverImageContainer}>
          {imageError ? (
            <LuImageOff />
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
              [likeButtonSelected]: isLiked,
            })}
          >
            <LuHeart
              className={clsx(heartIconStyle, {
                [isLikedStyle]: isLiked,
              })}
            />
            <LuHeartOff
              className={clsx(heartOffIconStyle, {
                [isLikedStyle]: isLiked,
              })}
            />
          </div>
          {isCustomBook ? (
            <>
              <div className={actionButtonStyle}>
                <LuPenLine />
              </div>
              <div className={actionButtonStyle}>
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

import clsx from 'clsx';
import { FaRegHeart } from 'react-icons/fa';
import styles from '~/components/BookBrowser/BookCard.module.scss';

const {
  root,
  coverImageContainer,
  coverImage,
  bookTitleStyle,
  authorNameContainerStyle,
  authorNameStyle,
  buttonGroupContainer,
  likeButtonStyle,
  likeButtonSelected,
} = styles;

interface BookCardProps {
  bookData: BookData;
}

const BookCard: React.FC<BookCardProps> = ({ bookData }) => {
  const { title, author, cover, description, id, publicationDate } = bookData;
  console.log('bookData', bookData);
  return (
    <div className={root}>
      <div>
        <div className={coverImageContainer}>
          <img src={cover} alt={'cover'} className={coverImage} />
        </div>
        <div className={bookTitleStyle}>{title}</div>
      </div>
      <div>
        <div className={authorNameContainerStyle}>
          by <span className={authorNameStyle}>{author}</span>
        </div>
        <div className={buttonGroupContainer}>
          <div
            className={clsx(likeButtonStyle, {
              [likeButtonSelected]: true,
            })}
          >
            <FaRegHeart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

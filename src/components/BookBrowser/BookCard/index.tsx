// I used this library as this supports ES6 imports and tree shaking,
// will take 1.7k if we use the whole library, which we won't be using
import { LuHeart, LuHeartOff, LuPenLine, LuTrash2 } from 'react-icons/lu';

import clsx from 'clsx';
import styles from '~/components/BookBrowser/BookCard.module.scss';
import useLikeBook from 'src/hooks/useLikeBook';
import { bookModalStateType } from 'src/pages/Home';
import { useDispatch } from 'react-redux';
import { deleteBook } from 'src/redux/actions/books';
import { toast } from 'material-react-toastify';
import Image from 'src/components/commonComponents/Image';

const {
  root,
  container,
  topSectionContainer,
  coverImageContainer,
  coverImage,
  bookTitleStyle,
  authorNameContainerStyle,
  authorNameStyle,
  buttonGroupContainer,
  actionButtonStyle,
  likeButtonStyle,
  heartIconStyle,
  heartOffIconStyle,
  deleteButtonStyle,
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

  const handleEditButtonClicked = () => {
    handleBookModalOpen({ type: 'edit', bookId: id });
  };

  const handleDeleteClick = () => {
    dispatch(deleteBook(bookData));
    toast.success('Book deleted successfully');
  };

  console.log('bookData', bookData);
  return (
    <div className={root}>
      <div className={container}>
        <div className={topSectionContainer}>
          <div>
            <div className={coverImageContainer}>
              <Image src={cover} alt={'cover'} className={coverImage} />
            </div>
            <div className={bookTitleStyle}>{title}</div>
          </div>

          <div className={authorNameContainerStyle}>
            by <span className={authorNameStyle}>{author}</span>
          </div>
        </div>
        <div>
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
                <div
                  className={clsx(actionButtonStyle, deleteButtonStyle)}
                  onClick={handleDeleteClick}
                >
                  <LuTrash2 />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

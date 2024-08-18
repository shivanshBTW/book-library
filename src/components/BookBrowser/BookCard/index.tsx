// I used this library as this supports ES6 imports and tree shaking,
// will take 1.7k if we use the whole library, which we won't be using
import { LuHeart, LuHeartOff, LuPenLine, LuTrash2 } from 'react-icons/lu';

import Button from 'src/components/commonComponents/Button';
import Image from 'src/components/commonComponents/Image';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { bookManageModalStateType } from 'src/pages/Home';
import clsx from 'clsx';
import styles from '~/components/BookBrowser/BookCard.module.scss';
import useEditDeleteBook from 'src/hooks/useEditDeleteBook';
import useLikeBook from 'src/hooks/useLikeBook';
import { useState } from 'react';

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
  deleteModalContentContainer,
  deleteConfirmationButtonsContainer,
  deleteConfirmationButton,
  yesButtonStyle,
  closeButtonStyle,
} = styles;

type BookCardProps = {
  bookData: BookData;
  likedList: number[];
  setLikedList: (likedList: number[]) => void;
  handleBookManageModalOpen: (state: bookManageModalStateType) => void;
};

const BookCard: React.FC<BookCardProps> = ({
  bookData,
  likedList,
  setLikedList,
  handleBookManageModalOpen,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id, title, author, cover, isCustomBook } = bookData;
  const { isBookLiked, handleToggleBookLike } = useLikeBook(
    id,
    likedList,
    setLikedList
  );
  const { handleEditButtonClicked, handleDelete } = useEditDeleteBook({
    bookData,
    handleBookManageModalOpen,
  });

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const onDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteModal = (
    <Modal
      open={isDeleteModalOpen}
      onClose={onDeleteModalClose}
      center
      classNames={{
        modal: deleteModalContentContainer,
        closeButton: closeButtonStyle,
        closeIcon: closeButtonStyle,
      }}
    >
      <div>Are you sure you want to delete this book?</div>
      <div className={deleteConfirmationButtonsContainer}>
        <Button
          onClick={handleDelete}
          className={clsx(deleteConfirmationButton, yesButtonStyle)}
        >
          Yes
        </Button>
        <Button
          onClick={onDeleteModalClose}
          className={deleteConfirmationButton}
        >
          No
        </Button>
      </div>
    </Modal>
  );

  return (
    <div className={root}>
      <div className={container}>
        <Link to={`/${id}`} className={topSectionContainer}>
          <div>
            <div className={coverImageContainer}>
              <Image src={cover} alt={'cover'} className={coverImage} />
            </div>
            <div className={bookTitleStyle}>{title}</div>
          </div>

          <div className={authorNameContainerStyle}>
            by <span className={authorNameStyle}>{author}</span>
          </div>
        </Link>

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
          {deleteModal}
        </div>
      </div>
    </div>
  );
};

export default BookCard;

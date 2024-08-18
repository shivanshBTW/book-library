import { useState } from 'react';
import BookDetailsSection from 'src/components/BookDetailsPage/BookDetailsSection';
import BookManageModal from 'src/components/commonComponents/BookManageModal';
import TopBar from 'src/components/TopBar';
import useModal from 'src/hooks/useModal';
import { bookManageModalStateType } from 'src/pages/Home';
import styles from '~/pages/BookDetailsPage.module.scss';

const { root } = styles;

function BookDetailsPage() {
  const [bookManageModalOpen, setBookManageModalOpen, onBookManageModalClose] =
    useModal();
  const [bookManageModalState, setBookManageModalState] =
    useState<bookManageModalStateType>({});

  const handleBookManageModalOpen = ({
    type,
    bookId,
  }: bookManageModalStateType) => {
    setBookManageModalState({ type, bookId });
    setBookManageModalOpen(true);
  };

  return (
    <div className={root}>
      <TopBar handleBookManageModalOpen={handleBookManageModalOpen} />
      <BookDetailsSection
        handleBookManageModalOpen={handleBookManageModalOpen}
      />

      <BookManageModal
        open={bookManageModalOpen}
        onClose={onBookManageModalClose}
        bookManageModalState={bookManageModalState}
      />
    </div>
  );
}

export default BookDetailsPage;

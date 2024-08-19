import { useState } from 'react';
import BookList from 'src/components/BookBrowser/BookList';
import BookManageModal from 'src/components/commonComponents/BookManageModal';
import TopBar from 'src/components/TopBar';
import useModal from 'src/hooks/useModal';
import styles from '~/pages/Home.module.scss';
const { homeRoot } = styles;

export interface bookManageModalStateType {
  type?: 'edit' | 'add';
  bookId?: number;
}

function Home() {
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
    <div className={homeRoot}>
      <TopBar handleBookManageModalOpen={handleBookManageModalOpen} />
      <BookList handleBookManageModalOpen={handleBookManageModalOpen} />

      <BookManageModal
        open={bookManageModalOpen}
        onClose={onBookManageModalClose}
        bookManageModalState={bookManageModalState}
      />
    </div>
  );
}

export default Home;

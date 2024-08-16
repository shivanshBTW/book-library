import { useState } from 'react';
import BookList from 'src/components/BookBrowser/BookList';
import BookManageModal from 'src/components/commonComponents/BookManageModal';
import TopBar from 'src/components/TopBar';
import useModal from 'src/hooks/useModal';
import styles from '~/pages/Home.module.scss';
const { homeRoot } = styles;

export interface bookModalStateType {
  type?: 'edit' | 'add';
  bookId?: number;
}

function Home() {
  const [bookModalOpen, setBookModalOpen, onBookModalClose] = useModal();
  const [bookModalState, setBookModalState] = useState<bookModalStateType>({});

  const handleBookModalOpen = ({ type, bookId }: bookModalStateType) => {
    setBookModalState({ type, bookId });
    setBookModalOpen(true);
  };

  return (
    <div className={homeRoot}>
      <TopBar handleBookModalOpen={handleBookModalOpen} />
      <BookList handleBookModalOpen={handleBookModalOpen} />

      <BookManageModal
        open={bookModalOpen}
        onClose={onBookModalClose}
        bookModalState={bookModalState}
      />
    </div>
  );
}

export default Home;

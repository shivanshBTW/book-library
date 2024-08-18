import BookDetailsSection from 'src/components/BookDetailsPage/BookDetailsSection';
import TopBar from 'src/components/TopBar';
import styles from '~/pages/BookDetailsPage.module.scss';

const { root } = styles;

function BookDetailsPage() {
  return (
    <div className={root}>
      <TopBar />
      <BookDetailsSection />
    </div>
  );
}

export default BookDetailsPage;

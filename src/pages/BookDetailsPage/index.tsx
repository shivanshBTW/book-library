import TopBar from 'src/components/TopBar';
import styles from '~/pages/BookDetailsPage.module.scss';
const { root } = styles;

function BookDetailsPage() {
  return (
    <div className={root}>
      <TopBar />
    </div>
  );
}

export default BookDetailsPage;

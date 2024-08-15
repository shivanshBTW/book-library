import BookList from 'src/components/BookBrowser/BookList';
import TopBar from 'src/components/TopBar';
import styles from '~/pages/Home.module.scss';
const { homeRoot } = styles;

function Home() {
  return (
    <div className={homeRoot}>
      <TopBar />
      <BookList />
    </div>
  );
}

export default Home;

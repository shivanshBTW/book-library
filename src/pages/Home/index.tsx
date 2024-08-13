import TopBar from 'src/components/commonComponents/TopBar';
import styles from '~/pages/Home.module.scss';
const { homeRoot } = styles;

function Home() {
  return (
    <div className={homeRoot}>
      <TopBar />
      Home
    </div>
  );
}

export default Home;

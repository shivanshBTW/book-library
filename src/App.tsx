import { Outlet } from 'react-router-dom';
import styles from 'src/styles/App.module.scss';

import 'material-react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'material-react-toastify';

const App: React.FC = () => {
  return (
    <div className={styles.AppRoot}>
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default App;

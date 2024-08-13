import 'material-react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'material-react-toastify';
import styles from '~/App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.AppRoot}>
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default App;

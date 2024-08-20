import { Link } from 'react-router-dom';
import Button from 'src/components/commonComponents/Button';
import { bookManageModalStateType } from 'src/pages/Home';
import styles from '~/components/commonComponents/topBar.module.scss';
const { containerRoot, root, headerIcon } = styles;

interface TopBarProps {
  handleBookManageModalOpen?: (state: bookManageModalStateType) => void;
}

function TopBar({ handleBookManageModalOpen }: TopBarProps) {
  const handleAddBookOpen = () => {
    if (handleBookManageModalOpen) {
      handleBookManageModalOpen({ type: 'add' });
    }
  };

  return (
    <div className={containerRoot}>
      <div className={root}>
        <Link to="/books" replace className={headerIcon}>
          BOOK LIBRARY
        </Link>
        {handleBookManageModalOpen ? (
          <Button onClick={handleAddBookOpen}>Add Books</Button>
        ) : null}
      </div>
    </div>
  );
}

export default TopBar;

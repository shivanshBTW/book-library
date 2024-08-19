import { Link } from 'react-router-dom';
import Button from 'src/components/commonComponents/Button';
import { bookManageModalStateType } from 'src/pages/Home';
import styles from '~/components/commonComponents/topBar.module.scss';
const { root, headerIcon } = styles;

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
    <div className={root}>
      <Link to="/" replace className={headerIcon}>
        Brands Are Live Books
      </Link>
      {handleBookManageModalOpen ? (
        <Button onClick={handleAddBookOpen}>Add Books</Button>
      ) : null}
    </div>
  );
}

export default TopBar;

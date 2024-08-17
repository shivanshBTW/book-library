import { Link } from 'react-router-dom';
import Button from 'src/components/commonComponents/Button';
import { bookModalStateType } from 'src/pages/Home';
import styles from '~/components/commonComponents/topBar.module.scss';
const { root, headerIcon } = styles;

type TopBarProps = {
  handleBookModalOpen?: (state: bookModalStateType) => void;
};

function TopBar({ handleBookModalOpen }: TopBarProps) {
  const handleAddBookOpen = () => {
    if (handleBookModalOpen) {
      handleBookModalOpen({ type: 'add' });
    }
  };

  return (
    <div className={root}>
      <Link to="/" replace className={headerIcon}>
        Brands Are Live Books
      </Link>
      {handleBookModalOpen ? (
        <Button onClick={handleAddBookOpen}>Add Books</Button>
      ) : null}
    </div>
  );
}

export default TopBar;

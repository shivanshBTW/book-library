import Button from 'src/components/commonComponents/Button';
import { bookModalStateType } from 'src/pages/Home';
import styles from '~/components/commonComponents/topBar.module.scss';
const { root } = styles;

type TopBarProps = {
  handleBookModalOpen: (state: bookModalStateType) => void;
};

function TopBar({ handleBookModalOpen }: TopBarProps) {
  const handleAddBookOpen = () => {
    handleBookModalOpen({ type: 'add' });
  };

  return (
    <div className={root}>
      <div>Brands Are Live Books</div>
      <Button onClick={handleAddBookOpen}>Add Books</Button>
    </div>
  );
}

export default TopBar;

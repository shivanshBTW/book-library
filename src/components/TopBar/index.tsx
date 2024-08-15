import Button from 'src/components/commonComponents/Button';
import useModal from 'src/hooks/useModal';
import styles from '~/components/commonComponents/topBar.module.scss';
const { root } = styles;

function TopBar() {
  const {} = useModal();
  return (
    <div className={root}>
      <div>Brands Are Live Books</div>
      <Button>Add Books</Button>
    </div>
  );
}

export default TopBar;

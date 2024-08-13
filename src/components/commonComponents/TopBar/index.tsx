import Button from 'src/components/commonComponents/Button';
import styles from '~/components/commonComponents/topBar.module.scss';
const { root } = styles;

function TopBar() {
  return (
    <div className={root}>
      <div>Brands Are Live Books</div>
      <Button>Add Books</Button>
    </div>
  );
}

export default TopBar;

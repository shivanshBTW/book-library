import Button from 'src/components/commonComponents/Button';
import Modal from 'react-responsive-modal';
import clsx from 'clsx';
import styles from '~/components/commonComponents/BookDeleteConfirmationModal.module.scss';

const {
  root,
  buttonsContainer,
  deleteConfirmationButton,
  yesButtonStyle,
  closeButtonStyle,
} = styles;

interface BookDeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

function BookDeleteConfirmationModal({
  open,
  onClose,
  handleDelete,
}: BookDeleteConfirmationModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      classNames={{
        modal: root,
        closeButton: closeButtonStyle,
        closeIcon: closeButtonStyle,
      }}
    >
      <div>Are you sure you want to delete this book?</div>
      <div className={buttonsContainer}>
        <Button
          onClick={handleDelete}
          className={clsx(deleteConfirmationButton, yesButtonStyle)}
        >
          Yes
        </Button>
        <Button onClick={onClose} className={deleteConfirmationButton}>
          No
        </Button>
      </div>
    </Modal>
  );
}

export default BookDeleteConfirmationModal;

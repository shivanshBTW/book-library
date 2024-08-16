import Modal from 'react-responsive-modal';
import { bookModalStateType } from 'src/pages/Home';
import styles from 'src/styles/components/commonComponents/BookManageModal.module.scss';
import TextField from 'src/components/commonComponents/TextField';
import useManageBook from 'src/hooks/useManageBook';
import { useForm } from 'react-hook-form';
import Button from 'src/components/commonComponents/Button';

const {
  root,
  closeButtonStyle,
  contentContainer,
  headerContainer,
  formContainer,
  formElementStyle,
  addBookButton,
} = styles;

interface BookManageModalProps {
  open: boolean;
  onClose: () => void;
  bookModalState: bookModalStateType;
}

function BookManageModal(props: BookManageModalProps) {
  const { open, onClose, bookModalState } = props;
  const { onSubmit } = useManageBook(bookModalState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookData>();

  return (
    <div className={root}>
      <Modal
        open={open}
        onClose={onClose}
        center
        classNames={{
          modal: contentContainer,
          closeButton: closeButtonStyle,
          closeIcon: closeButtonStyle,
        }}
      >
        <div className={headerContainer}>Add Book</div>
        <div className={formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={formElementStyle}>
            <TextField
              fullWidth
              label={'Title'}
              errorMessage={errors.title ? 'This field is required' : ''}
              {...register('title', { required: true })}
            />
            <TextField
              fullWidth
              label={'Author'}
              errorMessage={errors.author ? 'This field is required' : ''}
              {...register('author', { required: true })}
            />
            <TextField
              fullWidth
              label={'Description'}
              errorMessage={errors.description ? 'This field is required' : ''}
              {...register('description', { required: true })}
            />
            <TextField
              fullWidth
              label={'Cover'}
              errorMessage={errors.cover ? 'This field is required' : ''}
              {...register('cover', { required: true })}
            />
            <TextField
              fullWidth
              type="date"
              label={'Publication Date'}
              errorMessage={
                errors.publicationDate ? 'This field is required' : ''
              }
              {...register('publicationDate', { required: true })}
            />

            <Button type="submit" className={addBookButton}>
              Add Book
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default BookManageModal;

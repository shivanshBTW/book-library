import Modal from 'react-responsive-modal';
import { bookManageModalStateType } from 'src/pages/Home';
import styles from 'src/styles/components/commonComponents/BookManageModal.module.scss';
import TextField from 'src/components/commonComponents/TextField';
import useManageBook from 'src/hooks/useManageBook';
import { useForm } from 'react-hook-form';
import Button from 'src/components/commonComponents/Button';
import { useEffect } from 'react';
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';

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
  bookManageModalState: bookManageModalStateType;
}

function BookManageModal(props: BookManageModalProps) {
  const { open, onClose, bookManageModalState } = props;
  const { type, bookId } = bookManageModalState;
  const isEditSelected = type === 'edit';
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookData>();
  const { onSubmit } = useManageBook(bookManageModalState, onClose, reset);

  const customBookList = useSelector(
    (state: RootState) => state?.books?.customBookList || []
  );

  const selectedBookToEdit = customBookList.find((book) => book.id === bookId);

  useEffect(() => {
    if (isEditSelected && selectedBookToEdit) {
      const fields: (keyof BookData)[] = [
        'id',
        'title',
        'author',
        'description',
        'cover',
        'publicationDate',
      ];
      fields.forEach((field) => {
        if (field === 'publicationDate') {
          setValue(field, selectedBookToEdit[field]);
        } else {
          setValue(field, selectedBookToEdit[field]);
        }
      });
    } else {
      reset();
    }
  }, [selectedBookToEdit, reset, setValue, isEditSelected]);

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
        <div className={headerContainer}>
          {type === 'edit' ? 'Edit' : 'Add'} Book
        </div>
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
              {type === 'edit' ? 'Edit' : 'Add'} Book
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default BookManageModal;

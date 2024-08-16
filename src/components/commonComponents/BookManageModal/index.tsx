import clsx from 'clsx';
import Modal from 'react-responsive-modal';
import { bookModalStateType } from 'src/pages/Home';
import styles from 'src/styles/components/commonComponents/BookManageModal.module.scss';
import TextField from 'src/components/commonComponents/TextField';
import useManageBook from 'src/hooks/useManageBook';
import { useForm } from 'react-hook-form';
const { root, contentContainer } = styles;

interface BookManageModalProps {
  open: boolean;
  onClose: () => void;
  bookModalState: bookModalStateType;
}

type Inputs = {
  example: string;
  exampleRequired: string;
};

// id: number;
// title: string;
// author: string;
// description: string;
// cover: string;
// publicationDate: string;
// isCustomBook?: boolean;

function BookManageModal(props: BookManageModalProps) {
  const { open, onClose, bookModalState } = props;
  const { onSubmit } = useManageBook(bookModalState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div className={root}>
      <Modal open={open} onClose={onClose} center>
        <div className={contentContainer}>
          <div></div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField {...register('title', { required: true })} />
              {/* register your input into the hook by invoking the "register" function */}
              <input defaultValue="test" {...register('example')} />

              {/* include validation with required or other standard HTML validation rules */}
              <input {...register('exampleRequired', { required: true })} />
              {/* errors will return when field validation fails  */}
              {errors.exampleRequired && <span>This field is required</span>}

              <input type="submit" />
            </form>
          </div>
          <div></div>
        </div>
      </Modal>
    </div>
  );
}

export default BookManageModal;

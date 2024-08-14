import styles from '~/components/BookBrowser/BookCard.module.scss';

const { root } = styles;

interface BookCardProps {
  bookData: BookData;
}

const BookCard: React.FC<BookCardProps> = ({ bookData }) => {
  const { title, author, cover, description, id, publicationDate } = bookData;
  console.log('bookData', bookData);
  return (
    <div className={root}>
      <img src={cover} alt="" />
      {title}
    </div>
  );
};

export default BookCard;

interface BookCardProps {
  bookData: BookData;
}

const BookCard: React.FC<BookCardProps> = ({ bookData }) => {
  const { title } = bookData;
  return <div>{title}</div>;
};

export default BookCard;

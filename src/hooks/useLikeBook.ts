import { toast } from 'material-react-toastify';

interface useLikeBookReturn {
  isBookLiked: boolean;
  handleToggleBookLike: () => void;
}

const useLikeBook = (
  id: number,
  likedList: Array<number>,
  setLikedList: (likedList: Array<number>) => void
): useLikeBookReturn => {
  const isBookLiked = likedList.includes(id);
  const handleToggleBookLike = () => {
    if (isBookLiked) {
      setLikedList(likedList.filter((likedId) => likedId !== id));
      toast.info('Book removed from liked list');
    } else {
      setLikedList([...likedList, id]);
      toast.success('Book added to liked list');
    }
  };

  return { isBookLiked, handleToggleBookLike };
};

export default useLikeBook;

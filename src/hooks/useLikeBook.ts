type useLikeBookReturn = {
  isBookLiked: boolean;
  handleToggleBookLike: () => void;
};

const useLikeBook = (
  id: number,
  likedList: Array<number>,
  setLikedList: (likedList: Array<number>) => void
): useLikeBookReturn => {
  const isBookLiked = likedList.includes(id);
  const handleToggleBookLike = () => {
    if (isBookLiked) {
      setLikedList(likedList.filter((likedId) => likedId !== id));
    } else {
      setLikedList([...likedList, id]);
    }
  };

  return { isBookLiked, handleToggleBookLike };
};

export default useLikeBook;

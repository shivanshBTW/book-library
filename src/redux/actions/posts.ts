export const updatePostsList = (posts) => {
  return {
    type: 'UPDATE_POST_LIST',
    payload: posts,
  };
};

export const addPost = (post) => {
  return {
    type: 'ADD_POST',
    payload: post,
  };
};

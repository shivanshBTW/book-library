const initialState = {
  postList: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return {
        ...state,
        postList: [action.payload, ...state.postList],
      };
    case 'UPDATE_POST_LIST':
      return {
        ...state,
        postList: action.payload || [],
      };
    default:
      return state;
  }
};

export default postsReducer;

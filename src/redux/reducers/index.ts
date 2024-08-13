import { combineReducers } from 'redux';
import postsReducer from 'src/redux/reducers/posts';

const rootReducer = combineReducers({
  posts: postsReducer,
});

export default rootReducer;

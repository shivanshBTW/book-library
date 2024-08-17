import { combineReducers } from 'redux';
import booksReducer from 'src/redux/reducers/books';

const rootReducer = combineReducers({
  books: booksReducer,
});

export default rootReducer;

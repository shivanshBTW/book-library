import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'src/redux/reducers';

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

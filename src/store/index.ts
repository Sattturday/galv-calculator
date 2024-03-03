import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import timeReducer from './timeSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    time: timeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

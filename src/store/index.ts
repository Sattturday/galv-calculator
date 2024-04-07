import { configureStore } from '@reduxjs/toolkit';

import materialReducer from './materialSlice';
import timeReducer from './timeSlice';
import thicknessReducer from './thicknessSlice';

const store = configureStore({
  reducer: {
    material: materialReducer,
    time: timeReducer,
    thickness: thicknessReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

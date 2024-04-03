import { configureStore } from '@reduxjs/toolkit';
import stopwatchesReducer from './features/stopwatchesSlice';

export const store = configureStore({
  reducer: {
    stopwatches: stopwatchesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
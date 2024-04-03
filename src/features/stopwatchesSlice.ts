import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Stopwatch {
  id: string;
  name: string;
  time: number;
  isRunning: boolean;
  startTime?: number;
}

interface StopwatchesState {
  stopwatches: Stopwatch[];
  focusedStopwatchId: string | null;
}

const initialState: StopwatchesState = {
  stopwatches: [],
  focusedStopwatchId: null,
};

export const stopwatchesSlice = createSlice({
  name: 'stopwatches',
  initialState,
  reducers: {
    addStopwatch: (state, action: PayloadAction<{id: string; name?: string}>) => {
      const { id, name } = action.payload;
      state.stopwatches.push({
        id,
        name: name || `Stopwatch ${state.stopwatches.length + 1}`,
        time: 0,
        isRunning: false,
      });
    },
    removeStopwatch: (state, action: PayloadAction<string>) => {
      state.stopwatches = state.stopwatches.filter(stopwatch => stopwatch.id !== action.payload);
    },
    toggleStopwatch: (state, action: PayloadAction<string>) => {
      const stopwatch = state.stopwatches.find(stopwatch => stopwatch.id === action.payload);
      if (stopwatch) {
        if (!stopwatch.isRunning) {
          stopwatch.startTime = Date.now() - stopwatch.time;
          stopwatch.isRunning = true;
        } else {
          stopwatch.time = Date.now() - stopwatch.startTime!;
          stopwatch.isRunning = false;
        }
      }
    },
    /*updateStopwatchTime: (state, action: PayloadAction<string>) => {
      const stopwatch = state.stopwatches.find(stopwatch => stopwatch.id === action.payload);
      if (stopwatch && stopwatch.isRunning) {
        stopwatch.time = Date.now() - stopwatch.startTime!;
      }
    },*/
    resetStopwatch: (state, action: PayloadAction<string>) => {
      const stopwatch = state.stopwatches.find(stopwatch => stopwatch.id === action.payload);
      if (stopwatch) {
        stopwatch.time = 0;
        stopwatch.startTime = undefined;
        stopwatch.isRunning = false;
      }
    },
    /*  updateStopwatchTime: (state, action: PayloadAction<{id: string; time: number}>) => {
          const stopwatch = state.stopwatches.find(stopwatch => stopwatch.id === action.payload.id);
          if (stopwatch) {
              const elapsedTime = action.payload.time - stopwatch.startTime;
              stopwatch.time += elapsedTime;
          }
      },*/
    setFocusedStopwatch: (state, action: PayloadAction<string | null>) => {
      state.focusedStopwatchId = action.payload;
    },
    updateStopwatchName: (state, action: PayloadAction<{id: string; name: string}>) => {
      const stopwatch = state.stopwatches.find(stopwatch => stopwatch.id === action.payload.id);
      if (stopwatch) {
        stopwatch.name = action.payload.name;
      }
    },
  },
});

export const {
  addStopwatch,
  removeStopwatch,
  toggleStopwatch,
  //updateStopwatchTime,
  resetStopwatch,
  setFocusedStopwatch,
  updateStopwatchName
} = stopwatchesSlice.actions;

export default stopwatchesSlice.reducer;

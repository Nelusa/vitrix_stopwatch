import { createSlice } from '@reduxjs/toolkit';

export const stopwatchesSlice = createSlice({
    name: 'stopwatches',
    initialState: {
        stopwatches: [],
    },
    reducers: {
    },
});

export default stopwatchesSlice.reducer;

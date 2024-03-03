import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action,
} from '@reduxjs/toolkit';

import { ITime } from '../types/data';

const initialState: ITime = {
  m: null,
  units_m: 'кг',
  I: null,
  units_I: 'А',
  q: null,
  units_q: 'мг/Кл',
  wt: null,
  S: null,
  units_S: 'м²',
  j: null,
  units_j: 'А/дм²',
  p: null,
  units_p: 'кг/м³',
  h: null,
  units_h: 'мкм',
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    addTimeUnits(state, action: PayloadAction<{ key: string; value: string }>) {
      const { key, value } = action.payload;
      if (
        key === 'units_m' ||
        key === 'units_I' ||
        key === 'units_q' ||
        key === 'units_S' ||
        key === 'units_j' ||
        key === 'units_p' ||
        key === 'units_h'
      ) {
        state[key] = value;
      }
    },
  },
});

export const { addTimeUnits } = timeSlice.actions;

export default timeSlice.reducer;

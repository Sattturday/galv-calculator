import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action,
} from '@reduxjs/toolkit';

import { ITime } from '../types/data';

const initialState: ITime = {
  know_m: false,
  know_I: false,
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
    setCheckbox(state, action: PayloadAction<string>) {
      const key = action.payload;
      if (key === 'know_m' || key === 'know_I') state[key] = !state[key];
    },
  },
});

export const { addTimeUnits, setCheckbox } = timeSlice.actions;

export default timeSlice.reducer;

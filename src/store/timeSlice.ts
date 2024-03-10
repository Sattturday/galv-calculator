import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action,
} from '@reduxjs/toolkit';

import { IMaterial, ITime } from '../types/data';

export const fetchMaterial = createAsyncThunk<
  IMaterial[],
  string,
  { rejectValue: string }
>('time/fetchMaterial', async function (value, { rejectWithValue }) {
  const response = await fetch(
    `http://89.104.70.160/api/el_eqts/?search=${value}`,
  );

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const data = await response.json();

  return data;
});

const initialState: ITime = {
  matList: [],
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
  loading: false,
  error: null,
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
    setNumberValue(
      state,
      action: PayloadAction<{ key: string; value: number }>,
    ) {
      const { key, value } = action.payload;
      if (
        key === 'm' ||
        key === 'I' ||
        key === 'q' ||
        key === 'wt' ||
        key === 'S' ||
        key === 'j' ||
        key === 'p' ||
        key === 'h'
      ) {
        state[key] = value;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMaterial.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaterial.fulfilled, (state, action) => {
        state.matList = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { addTimeUnits, setCheckbox, setNumberValue } = timeSlice.actions;

export default timeSlice.reducer;

function isError(action: Action) {
  return action.type.endsWith('rejected');
}

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action,
} from '@reduxjs/toolkit';

import { Time, TimeResult } from '../types/data';
import { hasOwnPropertyFromUnknown } from '../utils/hasOwnPropertyFromUnknown';
import { BASE_URL } from '../utils/data';

export const fetchTime = createAsyncThunk<
  TimeResult,
  { [key: string]: string | number | null },
  { rejectValue: string }
>('time/fetchTime', async function (params, { rejectWithValue }) {
  const response = await fetch(`${BASE_URL}time/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (response.status === 400) {
    return rejectWithValue('Ответ меньше секунды!');
  }

  if (!response.ok) {
    return rejectWithValue('Что-то пошло не так!');
  }

  return (await response.json()) as TimeResult;
});

const initialState: Time = {
  know_m: false,
  know_I: false,
  values: {
    m: null,
    I: null,
    q: null,
    wt: null,
    S: null,
    j: null,
    p: null,
    h: null,
  },
  units: {
    units_m: { title: 'кг', id: 'kg', param: 'кг' },
    units_I: { title: 'А', id: 'A', param: 'А' },
    units_q: { title: 'мг/Кл', id: 'mg/Kl', param: 'мг/Кл' },
    units_S: { title: 'м²', id: 'm2', param: 'м2' },
    units_j: { title: 'А/дм²', id: 'A/dm2', param: 'А/дм2' },
    units_p: { title: 'кг/м³', id: 'kg/m3', param: 'кг/м3' },
    units_h: { title: 'мкм', id: 'mkm', param: 'мкм' },
  },
  resultTime: null,
  loading: false,
  error: null,
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    addTimeUnits(
      state,
      action: PayloadAction<{ key: string; value: { [key: string]: string } }>,
    ) {
      const { key, value } = action.payload;
      if (
        hasOwnPropertyFromUnknown(state.units, key) &&
        key.startsWith('units_')
      ) {
        state.units[key] = value;
      }
    },
    setCheckbox(state, action: PayloadAction<string>) {
      const key = action.payload;
      if (key === 'know_m' || key === 'know_I') state[key] = !state[key];
    },
    setNumberValue(
      state,
      action: PayloadAction<{ key: string; value: number | null }>,
    ) {
      const { key, value } = action.payload;
      if (
        hasOwnPropertyFromUnknown(state.values, key) &&
        !key.startsWith('units_') &&
        key !== 'know_m' &&
        key !== 'know_I'
      ) {
        state.values[key] = value;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTime.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTime.fulfilled, (state, action) => {
        state.resultTime = action.payload;
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

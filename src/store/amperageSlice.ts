import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action,
} from '@reduxjs/toolkit';

import { Amperage, AmperageResult } from '../types/data';
import { hasOwnPropertyFromUnknown } from '../utils/hasOwnPropertyFromUnknown';
import { BASE_URL } from '../utils/data';

export const fetchAmperage = createAsyncThunk<
  AmperageResult,
  { [key: string]: string | number | null },
  { rejectValue: string }
>('amperage/fetchAmperage', async function (params, { rejectWithValue }) {
  const response = await fetch(`${BASE_URL}amperage/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (response.status === 400) {
    return rejectWithValue('Какая-то ошибка!');
  }

  if (!response.ok) {
    return rejectWithValue('Что-то пошло не так!');
  }

  return (await response.json()) as AmperageResult;
});

const initialState: Amperage = {
  values: {
    j: null,
    S1: null,
    S2: null,
    S3: null,
    S4: null,
    S5: null,
    S6: null,
    S7: null,
    S8: null,
    S9: null,
    S10: null,
    S11: null,
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S16: null,
    S17: null,
    S18: null,
    S19: null,
    S20: null,
  },
  units: {
    units_j: { title: 'А/дм²', id: 'A/dm2', param: 'А/дм2' },
    units_S1: { title: 'м²', id: 'm2', param: 'м2' },
    units_S2: { title: 'м²', id: 'm2', param: 'м2' },
    units_S3: { title: 'м²', id: 'm2', param: 'м2' },
    units_S4: { title: 'м²', id: 'm2', param: 'м2' },
    units_S5: { title: 'м²', id: 'm2', param: 'м2' },
    units_S6: { title: 'м²', id: 'm2', param: 'м2' },
    units_S7: { title: 'м²', id: 'm2', param: 'м2' },
    units_S8: { title: 'м²', id: 'm2', param: 'м2' },
    units_S9: { title: 'м²', id: 'm2', param: 'м2' },
    units_S10: { title: 'м²', id: 'm2', param: 'м2' },
    units_S11: { title: 'м²', id: 'm2', param: 'м2' },
    units_S12: { title: 'м²', id: 'm2', param: 'м2' },
    units_S13: { title: 'м²', id: 'm2', param: 'м2' },
    units_S14: { title: 'м²', id: 'm2', param: 'м2' },
    units_S15: { title: 'м²', id: 'm2', param: 'м2' },
    units_S16: { title: 'м²', id: 'm2', param: 'м2' },
    units_S17: { title: 'м²', id: 'm2', param: 'м2' },
    units_S18: { title: 'м²', id: 'm2', param: 'м2' },
    units_S19: { title: 'м²', id: 'm2', param: 'м2' },
    units_S20: { title: 'м²', id: 'm2', param: 'м2' },
  },
  resultAmperage: null,
  loading: false,
  error: null,
};

const amperageSlice = createSlice({
  name: 'amperage',
  initialState,
  reducers: {
    addAmperageUnits(
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
    setNumberValue(
      state,
      action: PayloadAction<{ key: string; value: number | null }>,
    ) {
      const { key, value } = action.payload;
      if (
        hasOwnPropertyFromUnknown(state.values, key) &&
        !key.startsWith('units_')
      ) {
        state.values[key] = value;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAmperage.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmperage.fulfilled, (state, action) => {
        state.resultAmperage = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setNumberValue, addAmperageUnits } = amperageSlice.actions;

export default amperageSlice.reducer;

function isError(action: Action) {
  return action.type.endsWith('rejected');
}
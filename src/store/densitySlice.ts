import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action,
} from '@reduxjs/toolkit';

import { Density, DensityResult } from '../types/data';
import { hasOwnPropertyFromUnknown } from '../utils/hasOwnPropertyFromUnknown';
import { BASE_URL } from '../utils/data';

export const fetchDensity = createAsyncThunk<
  DensityResult,
  { [key: string]: string | number | null },
  { rejectValue: string }
>('density/fetchDensity', async function (params, { rejectWithValue }) {
  const response = await fetch(`${BASE_URL}currentdensity/`, {
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

  return (await response.json()) as DensityResult;
});

const initialState: Density = {
  values: {
    I: null,
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
    units_I: { title: 'А', id: 'A', param: 'А' },
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
  counts: {
    count_S1: 1,
    count_S2: 1,
    count_S3: 1,
    count_S4: 1,
    count_S5: 1,
    count_S6: 1,
    count_S7: 1,
    count_S8: 1,
    count_S9: 1,
    count_S10: 1,
    count_S11: 1,
    count_S12: 1,
    count_S13: 1,
    count_S14: 1,
    count_S15: 1,
    count_S16: 1,
    count_S17: 1,
    count_S18: 1,
    count_S19: 1,
    count_S20: 1,
  },
  resultDensity: null,
  loading: false,
  error: null,
};

const densitySlice = createSlice({
  name: 'density',
  initialState,
  reducers: {
    addDensityUnits(
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
    setCountValue(
      state,
      action: PayloadAction<{ key: string; value: number | null }>,
    ) {
      const { key, value } = action.payload;
      if (
        hasOwnPropertyFromUnknown(state.counts, key) &&
        key.startsWith('count_')
      ) {
        state.counts[key] = value !== null ? value : 1;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDensity.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDensity.fulfilled, (state, action) => {
        state.resultDensity = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setNumberValue, setCountValue, addDensityUnits } =
  densitySlice.actions;

export default densitySlice.reducer;

function isError(action: Action) {
  return action.type.endsWith('rejected');
}

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action,
} from '@reduxjs/toolkit';

import { Weight, WeightResult } from '../types/data';
import { hasOwnPropertyFromUnknown } from '../utils/hasOwnPropertyFromUnknown';
import { BASE_URL } from '../utils/data';

export const fetchWeight = createAsyncThunk<
  WeightResult,
  { [key: string]: string | number | null },
  { rejectValue: string }
>('weight/fetchWeight', async function (params, { rejectWithValue }) {
  const response = await fetch(`${BASE_URL}weight/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (response.status === 400) {
    return rejectWithValue('Некорректные данные!');
  }

  if (!response.ok) {
    return rejectWithValue('Что-то пошло не так!');
  }

  return (await response.json()) as WeightResult;
});

const initialState: Weight = {
  know_h: true,
  know_I: false,
  values: {
    t: null,
    I: null,
    q: null,
    wt: null,
    S: null,
    j: null,
    p: null,
    h: null,
  },
  units: {
    units_t: { title: 'ч', id: 'h', param: 'ч' },
    units_I: { title: 'А', id: 'A', param: 'А' },
    units_q: { title: 'мг/Кл', id: 'mg/Kl', param: 'мг/Кл' },
    units_S: { title: 'м²', id: 'm2', param: 'м2' },
    units_j: { title: 'А/дм²', id: 'A/dm2', param: 'А/дм2' },
    units_p: { title: 'кг/м³', id: 'kg/m3', param: 'кг/м3' },
    units_h: { title: 'мкм', id: 'mkm', param: 'мкм' },
  },
  resultWeight: null,
  loading: false,
  error: null,
};

const weightSlice = createSlice({
  name: 'weight',
  initialState,
  reducers: {
    addWeightUnits(
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
      if (key === 'know_h' || key === 'know_I') state[key] = !state[key];
    },
    setNumberValue(
      state,
      action: PayloadAction<{ key: string; value: number | null }>,
    ) {
      const { key, value } = action.payload;
      if (
        hasOwnPropertyFromUnknown(state.values, key) &&
        !key.startsWith('units_') &&
        key !== 'know_h' &&
        key !== 'know_I'
      ) {
        state.values[key] = value;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWeight.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeight.fulfilled, (state, action) => {
        state.resultWeight = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { addWeightUnits, setCheckbox, setNumberValue } =
  weightSlice.actions;

export default weightSlice.reducer;

function isError(action: Action) {
  return action.type.endsWith('rejected');
}

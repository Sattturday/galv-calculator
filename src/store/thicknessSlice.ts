import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action,
} from '@reduxjs/toolkit';

import { Thickness, ThicknessResult } from '../types/data';
import { hasOwnPropertyFromUnknown } from '../utils/hasOwnPropertyFromUnknown';
import { BASE_URL } from '../utils/data';

export const fetchThickness = createAsyncThunk<
  ThicknessResult,
  { [key: string]: string | number | null },
  { rejectValue: string }
>('thickness/fetchThickness', async function (params, { rejectWithValue }) {
  const response = await fetch(`${BASE_URL}height/`, {
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

  return (await response.json()) as ThicknessResult;
});

const initialState: Thickness = {
  know_m: true,
  know_j: false,
  values: {
    m: null,
    I: null,
    q: null,
    wt: null,
    S: null,
    j: null,
    p: null,
    t: null,
  },
  units: {
    units_m: { title: 'кг', id: 'kg', param: 'кг' },
    units_I: { title: 'А', id: 'A', param: 'А' },
    units_q: { title: 'мг/Кл', id: 'mg/Kl', param: 'мг/Кл' },
    units_S: { title: 'м²', id: 'm2', param: 'м2' },
    units_j: { title: 'А/дм²', id: 'A/dm2', param: 'А/дм2' },
    units_p: { title: 'кг/м³', id: 'kg/m3', param: 'кг/м3' },
    units_t: { title: 'ч', id: 'h', param: 'ч' },
    units_result: { title: 'мкм', id: 'mkm', param: 'мкм' },
  },
  resultThickness: null,
  loading: false,
  error: null,
};

const thicknessSlice = createSlice({
  name: 'thickness',
  initialState,
  reducers: {
    addThicknessUnits(
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
      if (key === 'know_m' || key === 'know_j') state[key] = !state[key];
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
        key !== 'know_j'
      ) {
        state.values[key] = value;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchThickness.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThickness.fulfilled, (state, action) => {
        state.resultThickness = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setCheckbox, setNumberValue, addThicknessUnits } =
  thicknessSlice.actions;

export default thicknessSlice.reducer;

function isError(action: Action) {
  return action.type.endsWith('rejected');
}

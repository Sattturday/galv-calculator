import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action,
} from '@reduxjs/toolkit';

import { IMaterial, ITime, ITimeResult } from '../types/data';

export const fetchMaterial = createAsyncThunk<
  IMaterial[],
  string,
  { rejectValue: string }
>('time/fetchMaterial', async function (value, { rejectWithValue }) {
  const response = await fetch(
    `http://89.104.70.160/api/el_eqts/?search=${value}`
  );

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const data = await response.json();

  return data;
});

export const fetchTime = createAsyncThunk<
  ITimeResult,
  { [key: string]: string | number | null },
  { rejectValue: string }
>('time/fetchTime', async function (params, { rejectWithValue }) {
  const response = await fetch('http://89.104.70.160/api/time/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  return (await response.json()) as ITimeResult;
});

const initialState: ITime = {
  resultTime: null,
  matList: [],
  know_m: false,
  know_I: false,
  m: null,
  units_m: { title: 'кг', id: 'kg', param: 'кг' },
  I: null,
  units_I: { title: 'А', id: 'A', param: 'А' },
  q: null,
  units_q: { title: 'мг/Кл', id: 'mg/Kl', param: 'мг/Кл' },
  wt: null,
  S: null,
  units_S: { title: 'м²', id: 'm2', param: 'м2' },
  j: null,
  units_j: { title: 'А/дм²', id: 'A/dm2', param: 'А/дм2' },
  p: null,
  units_p: { title: 'кг/м³', id: 'kg/m3', param: 'кг/м3' },
  h: null,
  units_h: { title: 'мкм', id: 'mkm', param: 'мкм' },
  loading: false,
  error: null,
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    addTimeUnits(
      state,
      action: PayloadAction<{ key: string; value: { [key: string]: string } }>
    ) {
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
      action: PayloadAction<{ key: string; value: number | null }>
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
    clearMatList(state) {
      state.matList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaterial.fulfilled, (state, action) => {
        state.matList = action.payload;
        state.loading = false;
      })
      .addCase(fetchTime.pending, (state) => {
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

export const { addTimeUnits, setCheckbox, setNumberValue, clearMatList } =
  timeSlice.actions;

export default timeSlice.reducer;

function isError(action: Action) {
  return action.type.endsWith('rejected');
}

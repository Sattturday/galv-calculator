import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action,
} from '@reduxjs/toolkit';

import { Material, MaterialState } from '../types/data';
import { BASE_URL } from '../utils/data';

export const fetchMaterial = createAsyncThunk<
  Material[],
  string,
  { rejectValue: string }
>('material/fetchMaterial', async function (value, { rejectWithValue }) {
  const response = await fetch(`${BASE_URL}el_eqts/?search=${value}`);

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const data = await response.json();

  return data;
});

const initialState: MaterialState = {
  matList: [],
  loading: false,
  error: null,
};

const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    clearMatList(state) {
      state.matList = [];
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

export const { clearMatList } = materialSlice.actions;

export default materialSlice.reducer;

function isError(action: Action) {
  return action.type.endsWith('rejected');
}

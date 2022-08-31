import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiLocation from './apiLocation';

import {ILocation} from '../../lib/types';

export type LocationState = {
  location: ILocation;
  loading: boolean;
  error: boolean;
};

const initialState: LocationState = {
  location: {lat: 0, lon: 0},
  loading: false,
  error: true,
};

//action para buscar a localização
export const fetchLocation = createAsyncThunk<{location: ILocation}>(
  'fetchLocation',
  async () => {
    const response = await apiLocation.fetchLocation();
    return response;
  },
);

const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLocation.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.location = {...action.payload.location};
        state.loading = false;
      })
      .addCase(fetchLocation.rejected, state => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default locationSlice.reducer;

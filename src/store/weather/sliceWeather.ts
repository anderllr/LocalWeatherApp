import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiWeather from './apiWeather';

import {ILocation} from '../../lib/types';

export type Weather = {
  status?: string;
  description?: string;
  icon?: string;
  iconUrl?: string;
  iconUrl2x?: string;
  iconUrl4x?: string;
  temp?: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
  pressure?: number;
  humidity?: number;
  dayOfWeek?: string;
  dt?: number;
  dtText?: string;
  timezone?: number;
  cityName?: string;
};

export type WeatherState = {
  weather: Weather;
  listweather: Weather[] | [];
  loading: boolean;
  error: boolean;
};

const initialState: WeatherState = {
  weather: {},
  listweather: [],
  loading: false,
  error: true,
};

type ListPayload = {
  location: ILocation;
  nrRegistros: number;
};
//action para buscar horas ou dias
//parâmetro type para definir se busca na api de horas ou
export const fetchListWeather = createAsyncThunk(
  'fetchListWeather',
  async (payload: ListPayload) => {
    const response = await apiWeather.fetchListWeather(
      payload.location,
      payload.nrRegistros,
    );
    if (response.kind === 'success') {
      return {
        listweather: response.body,
      };
    } else {
      throw 'Error fetching weather by list';
    }
  },
);

export const fetchCurrentWeather = createAsyncThunk(
  'fetchCurrentWeather',
  async ({location}: {location: ILocation}) => {
    if (!location) {
      throw 'Sem localização!';
    }
    const response = await apiWeather.fetchCurrentWeather(location);

    if (response.kind === 'success') {
      return {
        weather: response.body,
      };
    } else {
      throw 'Error fetching weather';
    }
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentWeather.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.weather = {...action.payload.weather};
        state.loading = false;
      })
      .addCase(fetchCurrentWeather.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchListWeather.fulfilled, (state, action) => {
        const {payload: listweather} = action;
        const {listweather: list} = listweather;

        state.listweather = [...(list !== undefined ? list : [])];

        state.loading = false;
      });
  },
});

export default weatherSlice.reducer;

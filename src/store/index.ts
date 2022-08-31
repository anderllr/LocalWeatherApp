import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import weatherSlice from './weather/sliceWeather';
import locationSlice from './location/sliceLocation';

const rootReducer = combineReducers({
  weather: weatherSlice,
  location: locationSlice,
});
export type RootState = ReturnType<typeof store.getState>;

//export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

//hooks para utilização global
import {useAppDispatch, useAppSelector, useColors} from '../lib/hooks';

import {
  fetchCurrentWeather,
  fetchListWeather,
  Weather,
} from '../store/weather/sliceWeather';

import {IListItem} from '../lib/types';
import {RootState} from '../store';

import Header from '../components/Header';

const Home: FC = () => {
  const [dataList, setDataList] = useState<IListItem[]>([]);
  const [weather, setWeather] = useState<Weather>({});

  const dispatch = useAppDispatch();

  const {background} = useColors();
  const weatherState = useAppSelector((state: RootState) => state.weather);
  const locationState = useAppSelector((state: RootState) => state.location);

  useEffect(() => {
    const {location} = locationState;
    if (location?.lat !== 0 && location?.lon !== 0) {
      updateLocalWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationState]);

  useEffect(() => {
    const {weather: w, listweather} = weatherState;
    setWeather(w);

    setDataList([
      ...listweather?.map(l => ({
        description: l.description.toUpperCase(),
        icon: l.iconUrl,
        temp: l.temp,
        title: l?.dtText?.split(' ')[1],
      })),
    ]);
  }, [weatherState]);

  const updateLocalWeather = () => {
    const {location} = locationState;
    dispatch(fetchCurrentWeather({location}));
    dispatch(fetchListWeather({location, nrRegistros: 4}));
  };

  return (
    <SafeAreaView style={{...styles.container, backgroundColor: background}}>
      <Header dataList={dataList} weather={weather} showDetail={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;

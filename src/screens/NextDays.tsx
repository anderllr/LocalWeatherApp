/**
 * A API gratuita fornece até 5 dias de 3 em 3 horas ou seja até 40 registros
 *
 * Para fazer dos próximos dias filtrei o array de retorno para trazer só os que contenham 0:00:00
 * pois só tem um para cada um mesmo
 *
 * O primeiro registro foi para o cabeçalho
 */

import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {useAppDispatch, useAppSelector, useColors} from '../lib/hooks';

import {fetchListWeather} from '../store/weather/sliceWeather';

import {Weather} from '../store/weather/sliceWeather';
import {RootState} from '../store';

import Header from '../components/Header';
import {IListItem} from '../lib/types';

const NextDays: FC = () => {
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
    const {listweather} = weatherState;

    //Como está tratando dos próximos dias vou filtrar todas as 0 horas
    //e o clima do topo será o primeiro da lista
    setDataList([
      ...listweather
        ?.filter(f => f.dtText.includes('00:00:00'))
        ?.map((l, index) => {
          if (index === 0) {
            //o primeiro registro da lista será o header do dia
            setWeather({...l});
          }
          return {
            description: l.description.toUpperCase(),
            icon: l.iconUrl,
            temp: l.temp,
            title: l?.dtText?.split(' ')[0], //zero porque eu quero a data
          };
        }),
    ]);
  }, [weatherState]);

  const updateLocalWeather = () => {
    const {location} = locationState;

    //pede 40 pois a API retorna de 3 em 3 horas = 5 dias
    //a api devolve 5 dias de fato
    dispatch(fetchListWeather({location, nrRegistros: 40}));
  };

  return (
    <SafeAreaView style={{...styles.container, backgroundColor: background}}>
      <Header dataList={dataList} weather={weather} showDetail={false} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NextDays;

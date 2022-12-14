/**
 * A API gratuita fornece até 5 dias de 3 em 3 horas ou seja até 40 registros
 *
 * Para fazer do amanhã eu calculei o dia atual + 1 e filtrei o array de retorno
 *
 * O primeiro registro foi para o cabeçalho
 */

import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {useAppDispatch, useAppSelector, useColors} from '../lib/hooks';

import {dayPlusOneToStr} from '../lib/helpers';

import {fetchListWeather} from '../store/weather/sliceWeather';

import {Weather} from '../store/weather/sliceWeather';
import {RootState} from '../store';

import Header from '../components/Header';
import {IListItem} from '../lib/types';

const Tomorrow: FC = () => {
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

    //Como está tratando do dia de amanhã vai pegar o dia de hoje mais 1
    //e o clima do topo será o primeiro da lista
    const tomorrow = dayPlusOneToStr('DD/MM/YYYY');
    setDataList([
      ...listweather
        ?.filter(f => f.dtText.includes(tomorrow))
        ?.map((l, index) => {
          if (index === 3) {
            //pega o terceiro registro da lista será o header do dia aproximadamente as 09:00
            setWeather({...l});
          }
          return {
            description: l.description.toUpperCase(),
            icon: l.iconUrl,
            temp: l.temp,
            title: l?.dtText?.split(' ')[1],
          };
        }),
    ]);
  }, [weatherState]);

  const updateLocalWeather = () => {
    const {location} = locationState;

    //pede 16 pois a API retorna de 3 em 3 horas então imagina que estamos no
    //início do dia
    dispatch(fetchListWeather({location, nrRegistros: 16}));
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

export default Tomorrow;

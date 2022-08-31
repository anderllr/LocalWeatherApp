/**
 * Componente do topo que mostra a localização do usuário e o clima do momento,
 * repete-se a cada página
 *
 * O botão com o ícone de reload é para atualizar a página
 *
 * Ele é chamado nas três páginas e recebe os parâmetros dos dados principais e da lista
 *
 */

import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootState} from '../store';

import {Weather} from '../store/weather/sliceWeather';

import {
  useAppDispatch,
  useAppSelector,
  useColors,
  useViewPortUnits,
} from '../lib/hooks';

import {fetchLocation} from '../store/location/sliceLocation';

import ListItem from '../components/ListItem';
import {IListItem} from '../lib/types';

interface Props {
  weather: Weather;
  showDetail: boolean;
  dataList: IListItem[];
}

const Header: FC<Props> = ({dataList, showDetail, weather}) => {
  const [statusLocation, setStatusLocation] = useState<string>('');

  const {vh} = useViewPortUnits();
  const colors = useColors();

  const dispatch = useAppDispatch();

  const locationState = useAppSelector((state: RootState) => state.location);

  useEffect(() => {
    async function requestPermission() {
      await requestLocationPermission();
    }
    requestPermission();
    //desabilitado pois precisamos rodar a permissão assim que abrir o app
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStatusLocation('');
    const {error} = locationState;
    if (error) {
      setStatusLocation('Erro Localização!');
    }
  }, [locationState]);

  const updateLocation = () => {
    dispatch(fetchLocation());
  };
  //Essa função vai solicitar a permissão para a localização
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      //    subscribeLocationLocation(); //serve para ficar pegando o tempo todo
      updateLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          updateLocation();
        } else {
          setStatusLocation('Localização não Concedida!');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const _renderHeaderBar = () => (
    <View
      style={{
        ...styles.location,
        backgroundColor: colors.header,
        height: 10 * vh,
      }}>
      <Icon name="map-marker" color={colors.fontHeader} size={5 * vh} />
      <Text
        style={{
          ...styles.textBold,
          color: colors.fontHeader,
          fontSize: 3 * vh,
        }}>
        {statusLocation ? statusLocation : weather?.cityName?.toUpperCase()}
      </Text>
      <View style={styles.dayHour}>
        <Text
          style={{
            ...styles.text,
            color: colors.fontHeader,
            fontSize: 2.5 * vh,
          }}>
          {weather?.dtText?.split(' ')[0]}
        </Text>
        <Text
          style={{
            ...styles.text,
            color: colors.fontHeader,
            fontSize: 2.5 * vh,
          }}>
          {weather?.dtText?.split(' ')[1]}
        </Text>
      </View>
      <TouchableOpacity onPress={() => updateLocation()}>
        <Icon name="reload" color={colors.fontHeader} size={5 * vh} />
      </TouchableOpacity>
    </View>
  );

  const _renderCurrentWeather = () => (
    <View style={{...styles.weather, height: 30 * vh}}>
      <View style={styles.columnDirection}>
        <Text
          style={{...styles.textBold, color: colors.font, fontSize: 5 * vh}}>
          {weather.dayOfWeek}
        </Text>
        <Text
          style={{
            ...styles.text,
            fontSize: 3 * vh,
            color: colors.font,
          }}>{`UMIDADE ${weather?.humidity}%`}</Text>
        <Text
          style={{
            ...styles.textBold,
            fontSize: 8 * vh,
            color: colors.font,
          }}>{`${weather?.temp}°`}</Text>
        <Text
          style={{
            ...styles.text,
            fontSize: 2 * vh,
            color: colors.font,
          }}>{`SENSAÇÃO ${weather?.feels_like}°`}</Text>
      </View>
      <View
        style={{
          ...styles.columnDirection,
          marginTop: -5 * vh,
        }}>
        <Image
          style={{
            width: 25 * vh,
            height: 25 * vh,
          }}
          resizeMode="contain"
          source={{uri: weather?.iconUrl4x}}
        />
        <Text
          style={{
            ...styles.text,
            fontSize: 2 * vh,
            color: colors.font,
          }}>
          {weather?.description?.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      overScrollMode="never"
      style={styles.container}
      ListHeaderComponent={
        <>
          {weather ? _renderHeaderBar() : null}
          {showDetail ? _renderCurrentWeather() : null}
        </>
      }
      contentContainerStyle={styles.container}
      numColumns={1}
      data={dataList}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}: {item: IListItem}) => <ListItem {...item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dayHour: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  columnDirection: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: 'normal',
  },
  textBold: {
    fontWeight: 'bold',
  },
  weather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
export default Header;

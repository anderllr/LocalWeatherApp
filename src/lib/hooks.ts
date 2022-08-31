/**
 * Arquivo com os hooks do app, objetivo de centralizar as tratativas de tipagem
 * bem como reduzir código em cada tela quando precisar utilizar um hooks
 *
 * Destaque aqui para useViewPorts -- objetivo de tratar do dimensionamento dos componentes
 * independente do dispositivo
 *
 * Também para useColors que devolve a paleta de cores e trata se está em darkMode
 *
 */

import {useColorScheme, useWindowDimensions} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useViewPortUnits = () => {
  const {width, height} = useWindowDimensions();

  const vh = height / 100;
  const vw = width / 100;

  return {vh, vw};
};

export enum colors {
  gray = '#484554',
  grayligth = '#d6d6d6',
  dark = '#00165A',
  light = '#FAF8FF',
  secBackground = '#928BB7',
  otherBackground = '#004129',
  darkDetail = '#00408A',
}

export const useColors = () => {
  const colorScheme = useColorScheme();

  const isDarkTheme = colorScheme === 'dark';

  return {
    background: isDarkTheme ? colors.dark : colors.light,
    header: isDarkTheme ? colors.light : colors.dark,
    font: isDarkTheme ? colors.grayligth : colors.dark,
    fontHeader: isDarkTheme ? colors.dark : colors.grayligth,
    detail: isDarkTheme ? colors.darkDetail : colors.grayligth,
    panel: isDarkTheme ? colors.dark : colors.grayligth,
    icon: isDarkTheme ? colors.light : colors.dark,
    iconFocused: isDarkTheme ? colors.grayligth : colors.darkDetail,
  };
};

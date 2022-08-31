import {useColorScheme, useWindowDimensions} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
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

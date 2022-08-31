import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import type {CompositeNavigationProp} from '@react-navigation/native';

export type HomeStackNavigatorParamList = {
  Home: undefined;
  NextDays: undefined;
  Tomorrow: undefined;
};

export type ListScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackNavigatorParamList>,
  BottomTabNavigationProp<BottomTabNavigatorParamList>
>;

export type BottomTabNavigatorParamList = {
  HomeStack: HomeStackNavigatorParamList;
  NextDays: undefined;
  Tomorrow: undefined;
};

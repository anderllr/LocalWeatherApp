/**
 * Colocadas todas as views para o caso do app evoluir e precisar navegar entre uma stack e outra
 * sem a necessidade de utilizar os bottomtabs
 */

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home';
import NextDaysScreen from '../screens/NextDays';
import TomorrowScreen from '../screens/Tomorrow';

import {HomeStackNavigatorParamList} from './types';

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{header: () => null}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="NextDays" component={NextDaysScreen} />
      <HomeStack.Screen name="Tomorrow" component={TomorrowScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;

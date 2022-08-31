import * as React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTabNavigatorParamList} from './types';
import HomeStackNavigator from './HomeStack';
import NextDaysScreen from '../screens/NextDays';
import TomorrowScreen from '../screens/Tomorrow';
import TabIcon from '../components/TabIcon';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: Platform.OS === 'ios' ? false : true,
        tabBarStyle: {
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderRadius: 6,
          height: 50,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <TabIcon title="Hoje" icon="calendar-today" {...props} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Tomorrow"
        component={TomorrowScreen}
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <TabIcon title="Amanhã" icon="archive-clock" {...props} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="NextDays"
        component={NextDaysScreen}
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <TabIcon title="Próximos Dias" icon="calendar-month" {...props} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#86c3e6',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabs;

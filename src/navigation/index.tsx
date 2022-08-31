import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Tabs from './TabStack';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default RootNavigator;

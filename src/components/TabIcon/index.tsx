/*
  componente criado para demonstrar os ícones da tabs no bottom
  Pode ser reutilizado em outros locais

  Utiliza ícone da MaterialCommunitIcons

  Para pesquisar mais ícones:
  https://materialdesignicons.com/

  Só passar o nome na prop: icon
*/

import React, {FC, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useColors, useViewPortUnits} from '../../lib/hooks';

interface Props {
  icon: string;
  title: string;
  focused: boolean;
  [x: string]: any;
}

const TabIcon: FC<Props> = ({icon, title, focused, ...props}) => {
  //Busca a unit de medida para criar proporcionalidade independente do tamanho do aparelho
  const {vh} = useViewPortUnits();
  const colors = useColors();

  return (
    <View style={styles.container} {...props}>
      <Icon
        name={icon}
        color={focused ? colors.iconFocused : colors.icon}
        size={4 * vh}
      />
      <Text
        style={{
          color: focused ? colors.iconFocused : colors.icon,
          fontSize: 2 * vh,
        }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(TabIcon);

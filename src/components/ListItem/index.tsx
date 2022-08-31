/*
  componente criado para demonstrar os ícones da tabs no bottom
  Pode ser reutilizado em outros locais

  Utiliza ícone da MaterialCommunitIcons

  Para pesquisar mais ícones:
  https://materialdesignicons.com/

  Só passar o nome na prop: icon
*/

import React, {FC, memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {useColors, useViewPortUnits} from '../../lib/hooks';

interface Props {
  description: string;
  icon: string;
  temp: number;
  title: string;
  [x: string]: any;
}

const ListItem: FC<Props> = ({description, icon, temp, title, ...props}) => {
  //Busca a unit de medida para criar proporcionalidade independente do tamanho do aparelho
  const {vh, vw} = useViewPortUnits();
  const colors = useColors();

  return (
    <View {...props}>
      <View
        style={{
          ...styles.list,
          height: 10 * vh,
          paddingHorizontal: 4 * vw,
          backgroundColor: colors.panel,
        }}>
        <Text style={{...styles.textBold, width: 25 * vw, fontSize: 3 * vh}}>
          {title}
        </Text>
        <Text style={{...styles.text, width: 25 * vw, fontSize: 2.5 * vh}}>
          {description}
        </Text>
        <View style={{width: 25 * vw}}>
          <Image
            style={{
              width: 10 * vh,
              height: 10 * vh,
            }}
            resizeMode="contain"
            source={{uri: icon}}
          />
        </View>
        <Text style={{...styles.textBold, width: 20 * vw, fontSize: 5 * vh}}>
          {`${temp}°`}
        </Text>
      </View>
      <View style={styles.hairLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hairLine: {
    height: 2,
    width: '100%',
    backgroundColor: '#fff',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'normal',
  },
  textBold: {
    fontWeight: 'bold',
  },
});

export default memo(ListItem);

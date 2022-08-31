/**
 * Criação dos tipos da Stack para o typescript,
 * já define quais são para que não se corra o risco de errar na configuração da navegação
 *
 * se houvesse passagem de parâmetros (props) entre as telas configuraria o padrão e tipos aqui,
 * como não tem estão atribuidas como undefined
 *
 * Só utilizei o Composite para exemplificar e tb se no futuro for necessária a navegação entre
 * as stacks diretamente não seja preciso repetir as screens em todas as Stacks.
 */
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

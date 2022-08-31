/*
 *  Criação de um arquivo de apoio para centralizar os caminhos usados no app
 *  e para ser fácil de saber quais são as chaves que são usadas
 *
 *  As chaves que vem do @env necessitam ser criadas em um arquivo .env
 *
 *  API da https://openweathermap.org/ é preciso fazer o cadastro lá e também
 *  verificar a documentação
 */

import {API_KEY} from '@env';

export const apiKey = API_KEY;

export enum Consts {
  apiBaseUrl = 'https://api.openweathermap.org/data/2.5/',
  apiBaseImageUrl = 'https://openweathermap.org/img/wn/',
  apiLanguage = 'pt_br',
}

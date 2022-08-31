/*
 * Arquivo de apoio para execução das APIs e conversão do JSON de retorno
 * em um dado padrão para o sistema
 *
 * Particularidades nela:
 *   Busca os dados fixos, endereços etc do arquivo consts
 *   Utiliza algumas funções simples de formatação de data para converter do modo que vem da
 *   API para o padrão português/Brasil
 */

import {Weather} from './sliceWeather';
import {
  formatDate,
  unixDateToDayOfWeek,
  unixDateToStr,
} from '../../lib/helpers';
import {ILocation} from '../../lib/types';
import {Consts, apiKey} from '../../lib/const';

type ResponseKind = 'success' | 'failure';

type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

//Funcão para gerar um objeto de retorno de acordo com a api que chama
// parametro o json
// type: current ou list -- pois alguns campos vem diferentes do retorno da api
const retObjWeather = (json: object | any, type: string = 'current') => {
  const {icon, main: status, ...weather} = json?.weather[0];
  const {feels_like, temp, temp_max, temp_min, ...main} = json?.main;

  return {
    ...weather,
    status,
    icon,
    iconUrl: `${Consts.apiBaseImageUrl}${icon}.png`,
    iconUrl2x: `${Consts.apiBaseImageUrl}${icon}@2x.png`,
    iconUrl4x: `${Consts.apiBaseImageUrl}${icon}@4x.png`,
    ...main,
    feels_like: feels_like,
    temp: Math.round(temp), //arredonda para o inteiro mais próximo
    temp_max: Math.round(temp_max), //arredonda para o inteiro mais próximo
    temp_min: Math.round(temp_min), //arredonda para o inteiro mais próximo
    dt: json?.dt,
    dtText:
      type === 'current'
        ? unixDateToStr(json?.dt, 'DD/MM/YYYY HH:mm:ss')
        : formatDate(json?.dt_txt, 'DD/MM/YYYY HH:mm:ss'),
    dayOfWeek: unixDateToDayOfWeek(json?.dt),
    timezone: json?.timezone,
    cityName: json?.name,
  };
};

//executa a API para trazer o clima do momento
export const fetchCurrentWeather = async (
  location: ILocation,
): Promise<NetworkResponse<Weather>> => {
  const response = await fetch(
    `${Consts.apiBaseUrl}weather?lang=${Consts.apiLanguage}&units=metric&lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.ok) {
    const json = await response.json();

    return {
      kind: 'success',
      body: retObjWeather(json),
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//executa a API para trazer o clima da api de 5 dias que funciona no plano gratuito
export const fetchListWeather = async (
  location: ILocation,
  nrRegistros: number,
): Promise<NetworkResponse<Weather[]>> => {
  const response = await fetch(
    `${Consts.apiBaseUrl}forecast?units=metric&lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&lang=${Consts.apiLanguage}&cnt=${nrRegistros}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.ok) {
    const json = await response.json();

    //pega aqui pois não vem na lista, ele vem no cabeçalho do json
    const {
      city: {name, timezone},
      list,
    } = json;

    const wResults = list?.map(js => {
      //atribui para reaproveitar o mesmo código
      js.name = name;
      js.timezone = timezone;
      return retObjWeather(js, 'list');
    });

    return {
      kind: 'success',
      body: wResults,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

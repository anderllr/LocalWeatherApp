/**
 * Guarda de alguns tipos que são usados em vários locais
 */

export interface ILocation {
  lat: number;
  lon: number;
}

export interface IListItem {
  description: string;
  icon: string;
  temp: number;
  title: string;
}

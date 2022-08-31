import moment from 'moment';

export enum weekDays {
  DOMINGO,
  SEGUNDA,
  TERÇA,
  QUARTA,
  QUINTA,
  SEXTA,
  SÁBADO,
}

export const fahrenheitToCelsius = (f: number) => {
  return Math.floor((5 / 9) * (f - 32));
};

export const kelvinToCelsius = (k: number) => {
  return Math.floor(k - 273.15);
};

//DATE FUNCTIONS
export const dayPlusOneToStr = (format: string = 'YYYY-MM-DD') => {
  var date = new Date();
  date.setDate(date.getDate() + 1);
  return moment(date).format(format);
};

export const formatDate = (date: string, format: string = 'YYYY-MM-DD') => {
  return moment(date).format(format);
};
export const unixDateToStr: string | any = (
  date: number,
  format: string = 'YYYY-MM-DD',
) => {
  return date ? moment.unix(date).format(format) : null;
};

export const unixDateToDayOfWeek: string | any = (date: number) => {
  return weekDays[moment.unix(date).weekday()];
};

import Geolocation from '@react-native-community/geolocation';

import {ILocation} from '../../lib/types';

export function fetchLocation() {
  return new Promise<{location: ILocation}>(resolve =>
    Geolocation.getCurrentPosition(
      //Get the current location
      position => {
        const {latitude, longitude} = position.coords;
        resolve({
          location: {
            lat: latitude,
            lon: longitude,
          },
        });
      },
      error => {
        throw `Error getting location: ${error}`;
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    ),
  );
}

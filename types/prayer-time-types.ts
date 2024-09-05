export interface PrayeTimes {
  data: {
    date: {
      gregorian: {
        date: string;
        day: string;
        weekday: {
          ar: string;
          en: string;
        };
        month: {
          en: string;
          number: number;
        };
        year: string;
      };
      hijri: {
        date: string;
        day: string;
        weekday: {
          ar: string;
          en: string;
        };
        month: {
          en: string;
          ar: string;
          number: number;
        };
        year: string;
      };
    };
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
      Firstthird: string;
      Imsak: string;
      Lastthird: string;
      Midnight: string;
      Sunrise: string;
      Sunset: string;
    };
  };
}

export type TType = {
  currentTime: {
    hour: number;
    minutes: number;
  };
  cityName: string;
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
} & {
  gregorian: {
    date: string;
    day: string;
    weekday: {
      ar: string;
      en: string;
    };
    month: {
      en: string;
      number: number;
    };
    year: string;
  };
  hijri: {
    date: string;
    day: string;
    weekday: {
      ar: string;
      en: string;
    };
    month: {
      en: string;
      ar: string;
      number: number;
    };
    year: string;
  };
};

export interface Location {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface City {
  address: {
    city: string;
    country: string;
    country_code: string;
    house_number: string;
    neighbourhood: string;
    postcode: string;
    road: string;
    state: string;
    state_district: string;
  };
}
export interface Coords {
  latitude: number;
  longitude: number;
}

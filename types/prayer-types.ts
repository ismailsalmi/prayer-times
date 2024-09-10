export interface PrayerTimes {
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

type GregorianAndHijri = PrayerTimes["data"]["date"];

export type TType = {
  currentTime: {
    hour: number;
    minutes: number;
  };
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
} & GregorianAndHijri;

export interface Coords {
  latitude: number;
  longitude: number;
}
export interface Location {
  coords: Coords;
}

export interface Hadiths {
  id: string;
  hadith: string;
  narrator: string;
}

export interface Fetcher<T = any> {
  data: T;
  error: Error;
  isLoading: boolean;
}

export type TPrayers = {
  id: number;
  name: string;
  time: string;
};

export interface PrevPrayer extends Omit<TPrayers, "time"> {
  minutes: number;
}

export type TypeToReturn = {
  afterPrevPrayer: PrevPrayer;
  remainsTime: Pick<TType["currentTime"], "hour" | "minutes">;
  currentPrayer: TPrayers;
};

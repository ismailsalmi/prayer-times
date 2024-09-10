import React, { useEffect, useMemo, useState } from "react";
import type { Coords, TPrayers, TType } from "types/prayer-types";
import RemainsTime from "./remains-time";
import useRemindeTime from "~/hooks/use-reminde-time";
import ShowCityName from "./show-city-name";
export default function PrayersTimes({
  Asr,
  Dhuhr,
  Fajr,
  Isha,
  Maghrib,
  Sunrise,
  coords,
  currentTime,
}: TType & { coords: Coords }) {
  const [cityName, setCityName] = useState<string>();

  useEffect(() => {
    const getCurrentCity = async () => {
      try {
        const citiesUrl = `https://nominatim.openstreetmap.org/reverse?lat=${coords?.latitude}&lon=${coords?.longitude}&format=json`;
        const res = await fetch(citiesUrl!);
        const json = await res.json();
        setCityName(json.address.city);
      } catch (e: unknown) {
        if (process.env.NODE_ENV === "development") {
          if (e instanceof TypeError) {
            console.log(e.message);
          }
        }
      }
    };
    getCurrentCity();
  }, [coords]);
  const { arPrayersList, enPrayersList } = useMemo(() => {
    const arList: TPrayers[] = [
      { id: 1, name: "الفجر", time: Fajr },
      { id: 2, name: "الصبح", time: Sunrise },
      { id: 3, name: "الظهر", time: Dhuhr },
      { id: 4, name: "العصر", time: Asr },
      { id: 5, name: "المغرب", time: Maghrib },
      { id: 6, name: "العشاء", time: Isha },
    ];
    const enList: TPrayers[] = [
      { id: 1, name: "Al-Fajr", time: Fajr },
      { id: 2, name: "Al-Sunrise", time: Sunrise },
      { id: 3, name: "Al-Dhuhr", time: Dhuhr },
      { id: 4, name: "Al-Asr", time: Asr },
      { id: 5, name: "Al-Maghrib", time: Maghrib },
      { id: 6, name: "Al-Isha", time: Isha },
    ];
    return { arPrayersList: arList, enPrayersList: enList };
  }, [Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha]);

  const [prayers, setPrayers] = useState<TPrayers[]>(arPrayersList);

  const { SetPrayersAndTime } = useRemindeTime();
  const { currentPrayer, remainsTime, afterPrevPrayer } = SetPrayersAndTime(
    arPrayersList,
    {
      ...currentTime,
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (prayers[0]?.name === "الفجر") {
        setPrayers(enPrayersList);
        return;
      }
      setPrayers(arPrayersList);
    }, 5000);
    return () => clearInterval(interval);
  }, [enPrayersList, arPrayersList, prayers]);

  return (
    <div>
      <ShowCityName cityName={cityName!} />
      <div className="w-full grid grid-cols-1">
        <RemainsTime
          currentTime={remainsTime!}
          name={currentPrayer?.name}
          enPrayersList={enPrayersList}
          arPrayersList={arPrayersList}
          afterPrevPrayer={afterPrevPrayer}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-orange-400 bg-opacity-20">
          {prayers?.map(({ name, time }, index) => {
            const isNextPrayer = time === currentPrayer?.time;
            return (
              <div
                key={index}
                className={`w-full text-center ${
                  isNextPrayer
                    ? "bg-orange-500 bg-opacity-60"
                    : "bg-transparent"
                } text-black p-4 border-b-2 border-gray-400 trnasparent`}
              >
                <h3 className="text-3xl font-bold">{name}</h3>
                <p className="text-2xl font-bold">{time || "00:00"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

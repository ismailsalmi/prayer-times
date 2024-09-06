import React from "react";
import type { TType } from "types/prayer-types";
import Hour from "./hour";
import City from "./city";
import useRemindeTime from "~/hooks/use-reminde-time";
export default function PyayersTimes({
  Asr,
  Dhuhr,
  Fajr,
  Isha,
  Maghrib,
  Sunrise,
  cityName,
  currentTime,
}: Omit<TType, "gregorian" | "hijri">) {
  const prayersList: { name: string; time: string }[] = [
    { name: "الفجر", time: Fajr },
    { name: "الصبح", time: Sunrise },
    { name: "الظهر", time: Dhuhr },
    { name: "العصر", time: Asr },
    { name: "المغرب", time: Maghrib },
    { name: "العشاء", time: Isha },
  ];

  interface TTime {
    hour: number;
    minutes: number;
    seconds?: number;
  }

  const prayerTime: TTime = {
    hour: currentTime?.hour,
    minutes: currentTime?.minutes,
  };

  const { setPrayersAndTime } = useRemindeTime();

  const { currentPrayer, reminderTime } = setPrayersAndTime(
    prayersList,
    prayersList[0].time,
    prayersList[5].time,
    prayerTime?.hour,
    prayerTime?.minutes
  );

  return (
    <div>
      <div className="w-full grid grid-cols-1">
        <Hour currentTime={reminderTime!} name={currentPrayer?.name} />
        <City cityName={cityName} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-indigo-400 bg-opacity-20">
          {prayersList?.map(({ name, time }, index) => {
            const isNextPrayer = name === currentPrayer?.name;
            return (
              <div
                key={index}
                className={`w-full text-center ${
                  isNextPrayer ? "bg-cyan-500" : "bg-transparent"
                } text-black p-4 border-b-2 border-gray-400`}
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

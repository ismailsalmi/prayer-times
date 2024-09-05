import { useState, useEffect } from "react";
const useReminderTime = () => {
  const [state, setState] = useState<{
    hours: number;
    minutes: number;
  }>({
    hours: 0,
    minutes: 0,
  });
  const getSubString = (string: string, start?: number, end?: number) => {
    if (start && end) {
      return string?.substring(start, end);
    }
    return string;
  };
  const parseToInt = (value: string) => parseInt(value);
  const replaceInString = (arg: unknown) => {
    if (typeof arg === "number") {
      return arg.toString().replace("-", "");
    }
    return "accepted only numbers";
  };

  type PrayersType = { name: string; time: string };
  type TypeToReturn = {
    reminderTime: { hour: number; minutes: number };
    currentPrayer: PrayersType;
  };
  const setPrayersAndTime = (
    prayersList: PrayersType[],
    fajr: string,
    isha: string,
    hour: number,
    minuts: number
  ): TypeToReturn => {
    useEffect(() => {
      const midNightTobellow = 24; // 24 hours in a day
      if (hour >= parseToInt(isha) && hour !== 0) {
        const fromIshaToMidNight = midNightTobellow - hour;
        const hrs = fromIshaToMidNight + parseToInt(fajr);
        const convertToMinutes = hrs * 60;
        const allMinutes = convertToMinutes - minuts;
        const minutes = allMinutes % 60;
        const hours = (allMinutes - minutes) / 60;

        setState({ hours, minutes });
      }
    }, [hour, minuts]);

    const prayer = prayersList.filter(({ time }) => {
      return parseToInt(time) === hour || parseToInt(time) > hour;
    });
    const reminderHours = replaceInString(hour - parseToInt(prayer[0]?.time));
    const reminderMinutes = replaceInString(
      minuts - parseToInt(getSubString(prayer[0]?.time, 3, 5))
    );
    const perfectTime = {
      hour: state.hours ? state.hours : parseToInt(reminderHours),
      minutes: state.minutes ? state.minutes : parseToInt(reminderMinutes),
    };

    return {
      reminderTime: perfectTime,
      currentPrayer: state.hours || state.minutes ? prayersList[0] : prayer[0],
    };
  };

  return {
    setPrayersAndTime,
  };
};

export default useReminderTime;

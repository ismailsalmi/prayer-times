import { useState, useEffect } from "react";
import { PrevPrayer, TPrayers, TType, TypeToReturn } from "types/prayer-types";

const parseToInt = (value: string) => parseInt(value);

const useReminderTime = () => {
  const [state, setState] = useState<{
    hour: number;
    minutes: number;
  } | null>(null);
  const [remainsTime, setRemainsTime] = useState<{
    hour: number;
    minutes: number;
  }>({
    hour: 0,
    minutes: 0,
  });

  const [afterPrevPrayer, setAfterPrevPrayer] = useState<PrevPrayer | null>(
    null
  );

  const SetPrayersAndTime = (
    prayersList: TPrayers[],
    currentTime: Pick<TType["currentTime"], "hour" | "minutes">
  ): TypeToReturn => {
    const { hour, minutes } = currentTime;
    const fajrAndIchae = prayersList.filter(({ name }) => {
      return name === "الفجر" || name === "العشاء";
    });
    const fajrTime = fajrAndIchae[0]?.time;
    const ichaeTime = parseToInt(fajrAndIchae[1]?.time);
    const dynamicTime = hour * 60 + minutes;
    const staticMinutes = parseToInt(fajrAndIchae[1]?.time.slice(-2));
    const allStaticTime = ichaeTime * 60 + staticMinutes;

    useEffect(() => {
      const midNightTobellow = 24; // 24 hours in a day
      if (dynamicTime > allStaticTime && hour !== 0) {
        const fromIshaToMidNight = midNightTobellow - hour;
        const hrs = fromIshaToMidNight + parseToInt(fajrTime);
        const convertToMinutes = hrs * 60;
        const allMinutes = convertToMinutes - minutes;
        const mins = allMinutes % 60;
        const hours = (allMinutes - mins) / 60;
        setState({ hour: hours, minutes });
      }
    }, [hour, minutes, dynamicTime, allStaticTime, fajrTime]);

    const prayer = prayersList.filter(({ time }) => {
      const all = parseToInt(time.replace(":", ""));
      const h = all.toString().slice(0, all.toString().length > 3 ? 2 : 1);
      const m = all.toString().slice(-2);
      const minutesToNumber = parseToInt(m);
      const hourToNumber = parseToInt(h) * 60;
      const rs = hourToNumber + minutesToNumber;

      return rs >= dynamicTime;
    });

    useEffect(() => {
      const staticMinutes = parseToInt(prayer[0]?.time.slice(-2));
      const staticHoures = parseToInt(prayer[0]?.time) * 60;
      const allStaticTime = staticHoures + staticMinutes;
      const mins = (allStaticTime - dynamicTime) % 60;
      const hrs = (allStaticTime - dynamicTime) / 60;

      setRemainsTime({
        hour: Math.trunc(hrs),
        minutes: mins,
      });
    }, [dynamicTime]);

    useEffect(() => {
      const prevPrayer = prayersList.filter(({ time }) => {
        const all = parseToInt(time.replace(":", ""));
        const h = all.toString().slice(0, all.toString().length > 3 ? 2 : 1);
        const m = all.toString().slice(-2);
        const minutesToNumber = parseToInt(m);
        const hourToNumber = parseToInt(h) * 60;
        const rs = hourToNumber + minutesToNumber;
        return rs <= dynamicTime;
      });
      const whenStartFromZero = (value: string): number => {
        const getMinutes = parseToInt(value);
        if (hour === parseToInt(pr?.time)) {
          if (getMinutes === minutes) {
            return 0;
          }
          const operator = Math.abs(getMinutes - 60) + minutes - 60;
          return operator;
        }
        return Math.abs(getMinutes - 60) + minutes;
      };
      const pr = prevPrayer[hour >= ichaeTime ? 0 : prevPrayer.length - 1];
      if (hour === parseToInt(pr?.time)) {
        if (parseToInt(pr?.time.slice(-2)) === 0) {
          setAfterPrevPrayer(() => ({
            id: pr?.id,
            name: pr?.name,
            minutes: minutes,
          }));
        } else {
          const m = whenStartFromZero(pr?.time.slice(-2));
          setAfterPrevPrayer({ id: pr?.id, name: pr?.name, minutes: m });
        }
      } else if (hour - parseToInt(pr?.time) === 1) {
        const m = whenStartFromZero(pr?.time.slice(-2));
        setAfterPrevPrayer({
          id: pr?.id,
          name: pr?.name,
          minutes: m,
        });
      } else {
        const ichae = prayersList[prayersList.length - 1];
        const incaheTime = ichae?.time;
        const minutesToNumber = parseToInt(incaheTime.slice(-2));
        let totalOfMinutes = 0;
        if (minutesToNumber !== 0) {
          totalOfMinutes = Math.abs(minutesToNumber - 60) + minutes;
        } else {
          totalOfMinutes = minutes;
        }

        setAfterPrevPrayer({
          id: ichae?.id,
          name: ichae?.name,
          minutes: totalOfMinutes,
        });
      }
    }, [minutes, hour, prayersList, dynamicTime, ichaeTime]);

    return {
      afterPrevPrayer: afterPrevPrayer!,
      remainsTime: state ? state : remainsTime,
      currentPrayer: state ? prayersList[0] : prayer[0],
    };
  };

  return {
    SetPrayersAndTime,
  };
};

export default useReminderTime;

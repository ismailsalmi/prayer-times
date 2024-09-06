import React from "react";
import type { TType } from "types/prayer-types";

type PrayersType = { name: string; time?: string };

export default function Hour({
  currentTime,
  name,
}: Pick<TType, "currentTime"> & PrayersType) {
  const { hour, minutes } = currentTime;
  const checkHoursgreaterThan2 = (hour: number) => {
    if (hour === 0) return "";
    else if (hour === 1) {
      return `ساعة` + " و";
    } else if (hour > 1) {
      return ` ${hour} ساعات` + " و";
    }
  };
  const reminderTime = `باقي على ${name!} ${checkHoursgreaterThan2(
    hour
  )} ${minutes} دقيقة`;
  return (
    <div className="text-2xl text-orange-600 font-bold mt-8 text-center">
      {name ? <p>{reminderTime}</p> : <p>التحميل...</p>}
    </div>
  );
}

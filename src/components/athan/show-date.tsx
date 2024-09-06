import React from "react";
import type { TType } from "../../../types/prayer-types";

export default function ShowDate({
  gregorian,
  hijri,
}: Pick<TType, "gregorian" | "hijri">) {
  const hijriDate = `${hijri?.weekday?.ar} ${hijri?.day} ${hijri?.month?.ar} ${hijri?.year}`;
  const gregorianDate = `${gregorian?.weekday?.en} ${gregorian?.day} ${gregorian?.month?.en} ${gregorian?.year}`;
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-xs md:text-sm text-red-500 text-start font-bold">
        {hijriDate}
      </h3>
      <h3 className="text-xs md:text-sm text-red-500 text-end font-bold">
        {gregorianDate}
      </h3>
    </div>
  );
}

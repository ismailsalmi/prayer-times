import React, { FC, useEffect, useState } from "react";
import type { TType, TPrayers, PrevPrayer } from "types/prayer-types";

type PrayersType = {
  name: string;
  time?: string;
  enPrayersList: TPrayers[];
  arPrayersList: TPrayers[];
  afterPrevPrayer: PrevPrayer;
} & Pick<TType, "currentTime">;

const RemainsTime: FC<PrayersType> = function ({
  currentTime,
  name,
  enPrayersList,
  arPrayersList,
  afterPrevPrayer,
}) {
  const { hour, minutes } = currentTime!;
  const [changeLanguage, setChangeLanguage] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setChangeLanguage((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, [changeLanguage]);

  return (
    <div
      dir={changeLanguage ? "rtl" : "ltr"}
      className="text-2xl text-orange-600 font-bold mt-8 mb-4 text-center"
    >
      {name ? (
        <>
          {afterPrevPrayer && afterPrevPrayer.minutes <= 15 ? (
            <div>
              {afterPrevPrayer.minutes === 0 ? (
                <div>
                  {!changeLanguage ? "جاري الأذان" : "The call to prayer"}
                </div>
              ) : (
                <div>
                  {!changeLanguage &&
                    `أذن لصلاة ${afterPrevPrayer.name} منذ ${
                      afterPrevPrayer.minutes === 1
                        ? "دقيقة"
                        : `${afterPrevPrayer.minutes} دقائق`
                    }`}
                  {changeLanguage &&
                    `${
                      enPrayersList?.filter(
                        (en) => en.id === afterPrevPrayer.id
                      )[0]?.name
                    } ${
                      afterPrevPrayer?.minutes === 1
                        ? `${afterPrevPrayer.minutes} minute`
                        : `${afterPrevPrayer.minutes} minutes`
                    } ago`}
                </div>
              )}
            </div>
          ) : (
            <div>
              {changeLanguage &&
                `${
                  enPrayersList?.find(
                    ({ time }) =>
                      arPrayersList.find((prayer) => prayer.name === name)
                        ?.time === time
                  )?.name
                } ${
                  hour === 0
                    ? "in"
                    : hour === 1
                    ? `in ${hour} hour and`
                    : `in ${hour} hours and`
                } ${minutes} ${minutes === 1 ? "minute" : "minutes"}`}
              {!changeLanguage &&
                `باقي على ${name!} ${
                  hour === 0
                    ? ""
                    : hour === 1
                    ? `${hour} ساعة و`
                    : `${hour} ساعات و`
                } ${minutes} دقيقة`}
            </div>
          )}
        </>
      ) : (
        <p>...تحميل</p>
      )}
    </div>
  );
};
export default RemainsTime;

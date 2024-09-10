"use client";
import Layout from "~/components/globals/layout";
import ShowDate from "~/components/show-date";
import React, { useState, useEffect } from "react";
import PrayersTimes from "~/components/prayers-times";
import type { TType, PrayerTimes } from "../../types/prayer-types";
import { useLocation } from "~/hooks/use-location";
import AutoSlidingWords from "~/components/sliding-words";
import { useFetcher } from "~/hooks/use-fetcher";

export default function Home() {
  const [currentDate, setCurrentDate] = useState<string>();
  const [currentTime, setCurrentTime] = useState<Pick<TType, "currentTime">>();
  const { coords, errorMessage } = useLocation();

  const apiUrl = `https://api.aladhan.com/v1/timings/${currentDate}?latitude=${coords?.latitude}&longitude=${coords?.longitude}&method=2`;
  const { data, error, isLoading } = useFetcher<PrayerTimes>(apiUrl);

  useEffect(() => {
    const date = new Date();
    const time = date?.toLocaleString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const interval = setInterval(() => {
      setCurrentTime({
        currentTime: {
          hour: parseInt(time?.substring(0, 2)),
          minutes: parseInt(time?.substring(3, 5)),
        },
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);
  useEffect(() => {
    const date = new Date();
    let currentDate = date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    currentDate = currentDate.replaceAll("/", "-");
    setCurrentDate(currentDate);
  }, []);

  const newData = {
    ...currentTime!,
    ...data?.data?.timings,
    ...data?.data?.date,
  } satisfies TType;

  if (errorMessage) {
    return (
      <Layout>
        <div className="text-sm text-red-600 font-bold p-12 opacity-75 rounded bg-orange-300">
          {errorMessage}
        </div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <div className="text-sm text-red-600 font-bold p-12 opacity-75 rounded bg-orange-300">
          {error.message}
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="text-3xl font-bold">جاري التحميل...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full mx-2 grid grid-cols-1">
        <ShowDate {...newData} />
        <PrayersTimes {...newData} coords={coords!} />
        <AutoSlidingWords />
      </div>
    </Layout>
  );
}

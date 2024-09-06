"use client";
import Layout from "~/components/globals/layout";
import ShowDate from "~/components/athan/show-date";
import React, { useState, useEffect } from "react";
import PrayerTimes from "~/components/athan/prayers-times";
import type { TType, City, Hadiths } from "../../types/prayer-types";
import { useLocation } from "~/hooks/use-location";
import { BackGroundImage } from "react-background-image-component";
import AutoSlidingWords from "~/components/sliding-words";
import useSWR from "swr";

export default function Home() {
  const [currentDate, setCurrentDate] = useState<string>();
  const [currentTime, setCurrentTime] = useState<Pick<TType, "currentTime">>();
  const [cityAddress, setCityAddress] = useState<City>();
  const { coords, errorMessage } = useLocation();
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const apiUrl = `https://api.aladhan.com/v1/timings/${currentDate}?latitude=${coords?.latitude}&longitude=${coords?.longitude}&method=2`;
  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  useEffect(() => {
    const getCurrentCity = async () => {
      try {
        const citiesUrl = `https://nominatim.openstreetmap.org/reverse?lat=${coords?.latitude}&lon=${coords?.longitude}&format=json`;
        const res = await fetch(citiesUrl!);
        const json = await res.json();
        setCityAddress(json as City);
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
    return () => {
      clearInterval(interval);
    };
  });
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

  const cityName = cityAddress?.address?.city;
  const newData = {
    cityName,
    ...currentTime,
    ...data?.data.timings,
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

  if (isLoading || !cityAddress?.address) {
    return (
      <Layout>
        <div className="text-3xl font-bold">جاري التحميل...</div>
      </Layout>
    );
  }

  return (
    <div>
      <BackGroundImage
        imgUrl="/images/mosque.jpeg"
        repeat="bg-no-repeat"
        size="bg-cover"
        attatchment="bg-fixed"
        position="bg-center"
      >
        <Layout>
          <div className="w-full  mx-2 grid grid-cols-1">
            <ShowDate {...newData} />
            <PrayerTimes {...newData} />
            <AutoSlidingWords />
          </div>
        </Layout>
      </BackGroundImage>
    </div>
  );
}

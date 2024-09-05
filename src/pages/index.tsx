"use client";
import Layout from "~/components/globals/layout";
import ShowDate from "~/components/athan/show-date";
import React, { useState, useEffect } from "react";
import PrayerTimes from "~/components/athan/prayers-times";
import type { TType, PrayeTimes, City } from "../../types/prayer-time-types";
import { useLocation } from "~/hooks/use-location";
import { BackGroundImage } from "react-background-image-component";

export default function Home() {
  const [prayers, setPyayers] = useState<PrayeTimes>();
  const [currentDate, setCurrentDate] = useState<string>();
  const [currentTime, setCurrentTime] = useState<Pick<TType, "currentTime">>();
  const [cityAddress, setCityAddress] = useState<City>();
  const { coords, errorMessage } = useLocation();
  useEffect(() => {
    const getPrayersTime = async () => {
      try {
        const prayersUrl = `https://api.aladhan.com/v1/timings/${currentDate}?latitude=${coords?.latitude}&longitude=${coords?.longitude}&method=2`;
        const res = await fetch(prayersUrl!);
        const data = await res.json();
        setPyayers(data as PrayeTimes);
      } catch (e: unknown) {
        if (process.env.NODE_ENV === "development") {
          const { message } = e as TypeError;
          console.error(message);
        }
      }
    };
    getPrayersTime();
  }, [cityAddress]);
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
    ...prayers?.data?.timings,
    ...prayers?.data?.date,
  } as TType;

  if (errorMessage) {
    return (
      <Layout>
        <div className="text-sm text-red-600 font-bold p-12 opacity-75 rounded bg-orange-300">
          {errorMessage}
        </div>
      </Layout>
    );
  }

  if (!prayers?.data || !cityAddress?.address) {
    return (
      <Layout>
        <div className="text-3xl font-bold">جاري التحميل...</div>
      </Layout>
    );
  }
  const imgUrl =
    "https://images.unsplash.com/photo-1581443459255-e895f2a4222f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

  return (
    <div>
      <BackGroundImage
        imgUrl={imgUrl}
        repeat="bg-no-repeat"
        size="bg-cover"
        attatchment="bg-fixed"
        position="bg-center"
      >
        <Layout>
          <div className="w-full md:w-1/2 mx-2 grid grid-cols-1">
            <ShowDate {...newData} />
            <PrayerTimes {...newData} />
          </div>
        </Layout>
      </BackGroundImage>
    </div>
  );
}

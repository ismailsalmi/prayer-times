"use client";
import React, { useEffect, useState } from "react";
import type { Hadiths } from "types/prayer-types";
import useSWR from "swr";
const AutoSlidingWords = () => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR<Hadiths[]>(
    "http://localhost:3001/posts",
    fetcher
  );
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (counter === data?.length! - 1) {
        setCounter(0);
      }
      setCounter((prevCounter) => prevCounter + 1);
    }, 20000);
    return () => clearInterval(interval);
  }, [counter]);
  return (
    <div className="w-full mt-8">
      <div className="relative overflow-hidden">
        {isLoading && (
          <p dir="ltr" className="text-center text-3xl font-bold">
            Loading...
          </p>
        )}
        {!isLoading && (
          <p className="relative animate-spin m-0 text-3xl font-bold words whitespace-nowrap">
            {data
              ?.slice(counter, counter + 1)
              .map(
                ({ hadith, narrator }) =>
                  `قال رسول الله صلى الله عليه وسلم (${hadith}) ${narrator}`
              )
              .join(" ")}
          </p>
        )}
      </div>
      <style jsx>{`
        @keyframes move-words {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .words {
          animation: move-words 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AutoSlidingWords;

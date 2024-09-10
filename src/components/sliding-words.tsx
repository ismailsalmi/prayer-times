"use client";
import React, { useEffect, useState } from "react";
import type { Hadiths } from "types/prayer-types";
import { useFetcher } from "~/hooks/use-fetcher";
const AutoSlidingWords = () => {
  const { data, error, isLoading } = useFetcher<Hadiths[]>("/db.json");
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (counter === data?.length! - 1 || 0) {
        setCounter(0);
      }
      setCounter((prevCounter) => prevCounter + 1);
    }, 20000);
    return () => clearInterval(interval);
  }, [counter, data?.length]);

  if (error) {
    return (
      <p className="text-lg text-center text-red-700 font-bold p-12 opacity-75 rounded">
        {error.message}
      </p>
    );
  }

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
            {(data as Hadiths[])
              ?.slice(counter, counter + 1)
              .map(
                ({ hadith, narrator }: Hadiths) =>
                  `قال رسول الله صلى الله عليه وسلم (${hadith}) ${narrator}`
              )
              .join(" ")}
          </p>
        )}
      </div>
      <style>{`
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

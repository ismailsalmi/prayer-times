import React from "react";
export default function City({ cityName }: { cityName: string }) {
  return (
    <h1 className="text-3xl text-gray-700 font-bold my-8 text-center">
      {cityName}
    </h1>
  );
}

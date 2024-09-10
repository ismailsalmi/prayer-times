import React, { FC, ReactNode } from "react";
const ShowCityName: FC<{ cityName: string }> = ({ cityName }) => {
  const Component: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <h3 className="text-3xl text-orange-800 font-bold my-8 text-center">
        {children}
      </h3>
    );
  };

  if (!cityName) {
    return <Component>جاري التحميل...</Component>;
  }

  return <Component>{cityName}</Component>;
};

export default ShowCityName;

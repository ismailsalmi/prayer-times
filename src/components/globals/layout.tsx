import React, { FC, ReactNode } from "react";
import { BackGroundImage } from "react-background-image-component";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BackGroundImage
      imgUrl="/images/mosque.jpeg"
      repeat="bg-no-repeat"
      size="bg-cover"
      attatchment="bg-fixed"
      position="bg-center"
    >
      <div className="h-screen flex justify-center items-center">
        {children}
      </div>
    </BackGroundImage>
  );
};
export default Layout;

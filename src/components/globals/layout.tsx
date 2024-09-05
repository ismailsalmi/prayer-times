import React, { ReactNode } from "react";
import { NextPage } from "next";

const Layout: NextPage<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        {children}
      </div>
    </>
  );
};
export default Layout;

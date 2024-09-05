import React from "react";
import Layout from "~/components/globals/layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="h-screen -mt-36 flex items-center justify-center">
        <h1 className="text-3xl -mb-36 font-bold text-center">
          الصفحة غير موجودة
        </h1>
      </div>
    </Layout>
  );
}

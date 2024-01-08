"use client";

import { getAllCloudFiles } from "@/clientApi/cloudFile";
import HomeMenu from "@/components/HomeMenu";
import ServiceTable from "@/components/ServiceTable";
import { SessionProvider } from "next-auth/react";
const MainContent = () => {
  return (
    <div className="relative h-screen overflow-hidden w-screen">
      <div className="absolute top-10 left-14 z-40">
        <SessionProvider>
          <HomeMenu />
        </SessionProvider>
      </div>

      <div className="w-full h-full overflow-y-hidden relative">
        <div className="absolute right-0 top-[26px] z-10">
          <img
            className="min-w-[900px] w-[60vw] object-cover"
            src="/images/building.png"
          />
        </div>
      </div>
      <div
        className="absolute h-[80%] w-[60%] p-2"
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto",
        }}
      >
        {/* <div className="h-[30%]">
          <h1 className="text-white text-3xl backdrop-blur-md w-fit rounded-xl ">
            V-FRI: A Web-based Flood Risk Index Platform
          </h1>
        </div>
        <div className="min-h-[300px] bg-gray-100 shadow-2xl p-5">
          <h2 className="font-bold text-2xl mb-4">Services</h2>
          <SessionProvider>
            <ServiceTable />
          </SessionProvider>
        </div> */}
      </div>

      <div className="w-screen h-[40vh] bg-[#990000] absolute bottom-[-23vh] right-[-20vw] -rotate-12 -rotate z-20"></div>

      <div className="w-screen h-[30vh] bg-[#990000] absolute bottom-[-13vh] right-[-30vw] z-20"></div>
      <div className="w-screen h-[40vh] bg-[#990000] absolute bottom-[-14vh] left-[-60vw] rotate-6 -rotate z-20"></div>

      <div className="w-screen h-[40vh] bg-[#791212] absolute bottom-[-160px] sm:bottom-[-25vh] right-[-40vw] -rotate-12 -rotate z-20"></div>
      <div className="w-screen h-[30vh] bg-[#791212] absolute bottom-[-25vh] xl:bottom-[-25vh] right-[-30vw] z-20"></div>
      <div className="w-screen h-[40vh] bg-[#791212] absolute bottom-[-26vh] left-[-60vw] rotate-6 -rotate z-20"></div>
    </div>
  );
};

export default MainContent;

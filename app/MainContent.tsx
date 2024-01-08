"use client";

import { getAllCloudFiles } from "@/clientApi/cloudFile";
import ServiceTable from "@/components/ServiceTable";
import { SessionProvider } from "next-auth/react";
const MainContent = () => {
  return (
    <div className="relative h-screen overflow-hidden w-screen">
      <div className="absolute top-10 left-14 flex gap-10 flex-col">
        <h1>
          <span className="text-[#791212] font-extrabold text-5xl">V</span>
          <span className="text-gray-600 font-bold text-4xl">FRI</span>
        </h1>
        <div>
          <p className="text-[#791212] font-extrabold text-7xl">VALUENZA</p>
          <p className="text-gray-600 font-bold text-5xl">FLOOD RISK</p>
          <p className="text-gray-600 font-bold text-5xl">INDEX</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#791212] px-5 py-2 rounded-lg text-white text-2xl">
            Login
          </button>
          <button className="bg-gray-600 px-5 py-2 rounded-lg text-white text-2xl">
            Flood Risk Index
          </button>
        </div>
      </div>

      <div className="w-full h-full overflow-y-hidden relative">
        <div className="absolute right-0 top-[20px] z-10">
          <img
            className="min-w-[850px] object-cover"
            src="/images/building.webp"
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

      <div className="w-screen h-[40vh] bg-[#990000] bottom-[-120px] absolute sm:bottom-[-110px] right-[-40vw] -rotate-12 -rotate z-20"></div>
      <div className="w-screen h-[30vh] bg-[#990000] absolute bottom-[-130px] xl:bottom-[-140px] right-[-30vw] z-20"></div>
      <div className="w-screen h-[40vh] bg-[#990000] absolute bottom-[-150px] left-[-60vw] rotate-6 -rotate z-20"></div>

      <div className="w-screen h-[40vh] bg-[#791212] absolute bottom-[-160px] sm:bottom-[-150px] right-[-40vw] -rotate-12 -rotate z-20"></div>
      <div className="w-screen h-[30vh] bg-[#791212] absolute bottom-[-170px] xl:bottom-[-180px] right-[-30vw] z-20"></div>
      <div className="w-screen h-[40vh] bg-[#791212] absolute bottom-[-26vh] left-[-60vw] rotate-6 -rotate z-20"></div>
    </div>
  );
};

export default MainContent;

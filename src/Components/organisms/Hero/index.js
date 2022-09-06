import React from "react";
import { Navbar } from "../Navbar";

export const Hero = () => {
  return (
    <div className="relative h-screen ">
      <div className="absolute bg-cover bg-center w-full h-full inset-0 hidden md:block bg-img" />

      <Navbar />

      <div className="relative w-1/4 pt-12 px-12 mb-8">
        <h1 className="text-9xl text-gray-900 font-extrabold tracking-widest">
          HELLSTONE
        </h1>
      </div>

      <div className="relative w-full pt-12 text-center mb-8">
        <h1 className="text-6xl w-full text-gray-900 font-extrabold">
          {" "}
          We'll can solve <span className="text-white">your problem</span>
        </h1>
      </div>

      {/* <div className=" pt-12 text-center">
        <Button />
      </div> */}
    </div>
  );
};

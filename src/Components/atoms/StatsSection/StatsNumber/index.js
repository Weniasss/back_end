import React from "react";

export const StatsNumber = (props) => {
  return (
    <h2 className="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
      {props.number}
    </h2>
  );
};

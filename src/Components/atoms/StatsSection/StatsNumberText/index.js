import React from "react";

export const StatsNumberText = (props) => {
  return (
    <p className="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
      {props.text}
    </p>
  );
};

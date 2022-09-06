import React from "react";

export const Title = (props) => {
  return (
    <div className=" text-4xl tracking-widest grid place-items-center p-10">
      <p className="text-7xl  text-gray-900 {props.color} font-extrabold  text-center">
        {props.text}
      </p>
    </div>
  );
};

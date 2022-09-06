import React from "react";

export const ServiceTitle = (props) => {
  return (
    <div class="font-bold text-5xl mb-2">
      <p className="text-4xl  text-gray-800 font-bold  text-center">
        {props.title}
      </p>
    </div>
  );
};

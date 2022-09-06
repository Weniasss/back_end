import React from "react";

export const NumericStep = (props) => {
  return (
    <div>
      <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div class="flex-shrink-0 w-10 h-10 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-stone-800 text-white relative z-10 title-font font-bold text-lg">
        {props.step}
      </div>
    </div>
  );
};

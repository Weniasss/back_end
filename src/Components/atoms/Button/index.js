import React from "react";

export const ButtonCustom = (props) => {
  return (
    <button
      class="relative inline-block text-sm font-medium text-white group focus:outline-none focus:ring "
    >
      <span class="absolute inset-0 border border-stone-600 group-active:border-stone-500"></span>
      <span class="tracking-widest text-2xl block px-10 py-3 transition-transform bg-stone-600 border border-stone-600 active:border-stone-500 active:bg-stone-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
        {props.text}
      </span>
    </button>
  );
};

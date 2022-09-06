import React from "react";

export const TextCard = (props) => {
  return (
    <>
      <p class="mt-4">
        <span className="font-black">Technology :</span> {props.text}
      </p>
      <p class="mt-4">
        <span className="font-black">Description :</span> {props.description}
      </p>
    </>
  );
};

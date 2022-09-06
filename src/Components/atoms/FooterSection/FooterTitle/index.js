import React from "react";

export const FooterTitle = (props) => {
  return (
    <h6 class="uppercase mb-4 flex justify-center md:justify-start text-white font-black">
      {props.title}
    </h6>
  );
};

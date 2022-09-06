import React from "react";

import { ServiceIcon } from "../../../atoms/ServiceSection/ServiceIcon";
import { ServiceText } from "../../../atoms/ServiceSection/ServiceText";
import { ServiceTitle } from "../../../atoms/ServiceSection/ServiceTitle";



export const ServiceContent = (props) => {
  return (
    <>
      {props.version === "1" && "1"}
      <div class={props.class}>
        <div class="text-center">
          <ServiceIcon icon={props.icon} />

          <ServiceTitle title={" Create Task"} />

          <ServiceText
            text={
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque,fugit quisquam hic nemo voluptas."
            }
          />
        </div>
      </div>
    </>
  );
};

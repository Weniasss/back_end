import React from "react";

import { StatsNumber } from "../../../atoms/StatsSection/StatsNumber";
import { StatsNumberText } from "../../../atoms/StatsSection/StatsNumberText";

export const StatsItem = (props) => {
  return (
    <div className="flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56 bg-white shadow rounded-2xl opacity-80">
      <StatsNumber number={props.number} />
      <StatsNumberText text={props.text} />
    </div>
  );
};

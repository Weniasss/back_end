import React from "react";

import { TitleStep } from "../../../atoms/StepSection/TitleStep";
import { TextStep } from "../../../atoms/StepSection/TextStep";

export const ItemStep = (props) => {
  return (
    <div className="flex p-1 bg-gray-100 rounded">
      <div className="m-3">
        <TitleStep title={props.title} icon={props.icon} />

        <TextStep text={props.text} />
      </div>
    </div>
  );
};

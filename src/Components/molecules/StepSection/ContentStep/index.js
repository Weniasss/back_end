import React from "react";

import { IconStep } from "../../../atoms/StepSection/IconStep";
import { TitleStep } from "../../../atoms/StepSection/TitleStep";
import { TextStep } from "../../../atoms/StepSection/TextStep";

export const ContentStep = (props) => {
  return (
    <>
      <IconStep icon={props.icon} />

      <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
        <TitleStep title={props.title} />

        <TextStep text={props.text} />
      </div>
    </>
  );
};

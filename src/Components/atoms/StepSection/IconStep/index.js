import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export const IconStep = (props) => {
  return (
    <>
      {props.icon === "faRightToBracket" && (
        <FontAwesomeIcon className="mr-4 text-4xl" icon={faRightToBracket} />
      )}

      {props.icon === "faAnglesRight" && (
        <FontAwesomeIcon className="mr-4 text-4xl" icon={faAnglesRight} />
      )}

      {props.icon === "faClock" && (
        <FontAwesomeIcon className="mr-4 text-4xl" icon={faClock} />
      )}
    </>
  );
};

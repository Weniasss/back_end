import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faMobileRetro } from "@fortawesome/free-solid-svg-icons";

export const FooterInfo = (props) => {
  return (
    <p class="text-white flex items-center justify-center md:justify-start mb-4">
      {props.icon === "faHome" && (
        <FontAwesomeIcon className="mr-3" icon={faHome} />
      )}

      {props.icon === "faEnvelope" && (
        <FontAwesomeIcon className="mr-3" icon={faEnvelope} />
      )}

      {props.icon === "faPhone" && (
        <FontAwesomeIcon className="mr-3" icon={faPhone} />
      )}

      {props.icon === "faMobileRetro" && (
        <FontAwesomeIcon className="mr-3" icon={faMobileRetro} />
      )}
      {props.text}
    </p>
  );
};

import React from "react";

import { FooterTitle } from "../../../atoms/FooterSection/FooterTitle";
import { FooterLink } from "../../../atoms/FooterSection/FooterLink";

export const Column2 = (props) => {
  return (
    <div>
      <FooterTitle title={props.title1} />

      <FooterLink text={props.text1} />

      <FooterLink text={props.text2} />

      <FooterLink text={props.text3} />

      <FooterLink text={props.text4} />
    </div>
  );
};

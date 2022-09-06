import React from "react";

import { FooterTitle } from "../../../atoms/FooterSection/FooterTitle";
import { FooterInfo } from "../../../atoms/FooterSection/FooterInfo";

export const Column3 = () => {
  return (
    <div class="">
      <FooterTitle title="Contacts" />

      <FooterInfo text="New York, NY 10012, US" icon="faHome" />

      <FooterInfo text="info@example.com" icon="faEnvelope" />

      <FooterInfo text="+ 01 234 567 88" icon="faPhone" />

      <FooterInfo text="+ 01 234 567 89" icon="faMobileRetro" />
    </div>
  );
};

import React from "react";

import { TitleCard } from "../../../atoms/ExampleProjectCard/TitleCard";
import { TextCard } from "../../../atoms/ExampleProjectCard/TextCard";
import { ButtonCard } from "../../../atoms/ExampleProjectCard/ButtonCard";

export const CardItem = (props) => {
  return (
    <div class="flex justify-center mb-8 ">
      <div class="bg-white max-w-sm border-black border-dashed border-2">
        <div class="p-6">
          {/* <img className="shadow-lg" src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt=""/> */}

          <TitleCard title={props.title} />

          <TextCard text={props.text} description={props.description} />

          <ButtonCard id={props.id} />
        </div>
      </div>
    </div>
  );
};

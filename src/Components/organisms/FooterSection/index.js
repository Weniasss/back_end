import React from "react";

import { Column1 } from "../../molecules/FooterSection/Column1";
import { Column2 } from "../../molecules/FooterSection/Column2";
import { Column3 } from "../../molecules/FooterSection/Column3";

export const FooterSection = () => {
  return (
    <footer class="text-center lg:text-left bg-zinc-800 text-gray-600">
      <div class="mx-6 py-10 text-center md:text-left">
        <div class="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Column1 />

          <Column2
            title1="Products"
            text1="Angular"
            text2="React"
            text3="Vue"
            text4="Laravel"
          />

          <Column2
            title1="Products"
            text1="Angular"
            text2="React"
            text3="Vue"
            text4="Laravel"
          />

          <Column3 />
        </div>
      </div>

      <div class="text-center p-6 bg-zinc-800 border-t-2">
        <span className="text-white">© 2021 Copyright:</span>
        <a
          class="text-white font-semibold"
          href="https://tailwind-elements.com/"
        >
          Tailwind Elements
        </a>
      </div>
    </footer>
  );
};

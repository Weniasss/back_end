import React from "react";
import { StatsItem } from "../StatsItem";

export const StatsGroupItems = () => {
  return (
    <div className="mx-auto container md:-mt-28 -mt-20 flex justify-center items-center">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-x-2 gap-y-2 lg:gap-x-6 md:gap-x-6">
        <StatsItem number="40+" text="Happy Clients" />

        <StatsItem number="540+" text="Projects Completed" />

        <StatsItem number="300" text="Dedicated Members" />

        <StatsItem number="25+" text="Awards Won" />
      </div>
    </div>
  );
};

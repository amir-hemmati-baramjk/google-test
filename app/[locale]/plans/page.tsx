"use client";
import React from "react";
import BackHeaderForRootPages from "../_components/backHeader/backHeaderForRootPages";
import { BackHeaderForsubPages } from "../_components/backHeader/backHeaderForsubPages";

export default function page() {
  return (
    <div className=" text-white min-h-screen">
      <BackHeaderForRootPages />
      <div className="container m-auto flex flex-col gap-5">
        <h1 className="text-lg lg:text-4xl font-bold text-center">
          Game Packages
        </h1>
        <p className="text-center">
          Choose Your Preferred Package, Increase Your Knowledge & Have Fun With
          Us !!
        </p>
      </div>
    </div>
  );
}

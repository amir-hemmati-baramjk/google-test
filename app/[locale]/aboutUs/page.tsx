import Image from "next/image";
import React from "react";
import { BackHeaderForsubPages } from "../_components/backHeader/backHeaderForsubPages";

export default function page() {
  return (
    <div>
      <BackHeaderForsubPages title="About Falta" />
      <div className="flex flex-col justify-center items-center gap-5 p-5">
        <Image
          alt=""
          className="w-full lg:w-1/3"
          width={1000}
          height={1000}
          src={"/staticImages/about-falta.png"}
        />
        <div className="flex flex-col justify-center items-center gap-5 w-full lg:w-1/2 ">
          <h2 className="text-3xl lg:text-4xl font-[700] text-white text-center">
            Falta Is The Ultimate Trivia Game
          </h2>
          <p className="text-white text-center text-md lg:text-xl max-w-lg">
            We’re A Kuwaiti Team That Believes Entertainment Isn’t Just Fun And
            Games — It’s Impact, Value, And Yes, Serious Potential For Profit
            Too. With Our Deep Experience In The Entertainment Scene, We
            Realized That Multiplayer Games And Interactive Challenges Are What
            Truly Bring People Together. They’re Not Just A Way To Pass Time —
            They Spark Ideas, Create Connections, And Light Up The Spirit Of
            Healthy Competition. We Also Noticed How Much Time People Spend On
            Social Media… So We Thought: Why Not Bring Entertainment And Social
            Connection Together In One Smart, Fun, And Powerful Platform? A
            Place Where Users Enjoy, Laugh, Compete — And Brands Can Genuinely
            Engage With Their Audience In Real Time. And That’s How Falta! Was
            Born. We Chose The Name Falta Because, In Kuwaiti Slang, It Means
            Someone Who’s Outstanding, Sharp, And A Natural Standout. That’s
            Exactly What We Aim To Bring Out In Every Player — Their Inner
            Genius, Their Competitive Edge, And Their Fun-Loving Spirit. Falta!
            Is More Than Just A Game. It’s A Whole World Of Fast-Paced
            Questions, Multiplayer Challenges, Live Tournaments, And Even
            Virtual Reality And Metaverse Experiences. We’re Not Just Building A
            Game — We’re Creating A Movement, Made In Kuwait, Made For The
            Region, And Made For Anyone Ready To Show They’ve Got What It Takes
            To Be A Real Falta.
          </p>
        </div>
      </div>
    </div>
  );
}

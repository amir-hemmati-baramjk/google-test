import React from "react";

export default function GameCardSkeleton() {
  return (
    <div className="p-5 relative bg-light-purple border-[2px] border-white rounded-[20px] w-full min-h-[300px] animate-pulse">
      <div className="absolute -top-5 left-0 w-full flex justify-around items-center">
        <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
        <div className="h-10 bg-gray-300 rounded-lg w-10"></div>
      </div>
      <div className="my-10 h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center gap-3"
          >
            <div className="bg-gray-300 p-2 rounded-lg w-24 h-24"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

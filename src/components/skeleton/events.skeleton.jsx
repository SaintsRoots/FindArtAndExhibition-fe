import React from "react";

function Skeleton({ title }) {
  return (
    <div role="status" className="bg-secondary shadow-md rounded-md p-5 hover:scale-105 transition ease-out duration-200 hover:shadow-xl">
      <div className="flex justify-center p-1">
        <div className="flex justify-center items-center rounded-full bg-gray-300 w-16 h-16 animate-pulse"></div>
      </div>
      <h3 className="text-gray-300 text-lg text-center mt-4 mb-3 font-bold bg-gray-300 mx-auto w-1/2 h-2 animate-pulse">{title}</h3>
      <p className="text-gray-300 text-xs text-center animate-pulse  bg-gray-300 w-5/5 h-2 m-2"></p>
      <p className="text-gray-300 text-xs text-center animate-pulse  bg-gray-300 w-5/5 h-2 m-2"></p>
      <p className="text-gray-300 text-xs text-center animate-pulse  bg-gray-300 w-2/3 mx-auto h-2 m-2"></p>
    </div>
  );
}

export default Skeleton;

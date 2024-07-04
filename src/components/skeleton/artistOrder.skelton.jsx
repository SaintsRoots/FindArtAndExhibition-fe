import React from "react";

function Skeleton() {
  return (
    <tr className="animate-pulse !w-full ">
      <td className="px-3 py-4 whitespace-nowrap">
        <div className="h-2  bg-gray-300 rounded w-[20vw]"></div>
      </td>
      <td className="px-3 py-4 whitespace-nowrap">
        <div className="h-2 bg-gray-300 rounded w-[20vw]"></div>
      </td>
      <td className="px-3x py-4 whitespace-nowrap">
        <div className="h-2 bg-gray-300 rounded w-[20vw]"></div>
      </td>
      <td className="px-3x py-4 whitespace-nowrap">
        <div className="h-2 bg-gray-300 rounded w-[20vw]"></div>
      </td>
  
    </tr>
  );
}

export default Skeleton;

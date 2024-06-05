function Skeleton() {
  return (
    <div
      role="status"
      className="bg-secondary shadow-md hover:scale-105 relative overflow-hidden rounded-xl transition ease-out duration-200 hover:shadow-md"
    >
      <div className="flex justify-center items-center  bg-gray-200 h-[270px] animate-pulse"></div>
      <div className="absolute left-0 top-0 w-full h-full flex flex-col p-3 gap-2 justify-end ">
        <div className="flex justify-between items-start animate-pulse   gap-2">
          <div className="flex flex-col gap-1 animate-pulse leading-6">
            <p className="text-gray-300 text-xs text-center animate-pulse !w-[284px] md:!w-[160px]  bg-gray-300 p-1  "></p>
            <p className="text-gray-300 text-xs text-center animate-pulse !w-[200px] md:!w-[130px]  bg-gray-300 p-1 "></p>
          </div>
          <p className="text-gray-300 text-xs text-center animate-pulse !w-[284px] md:!w-[160px]  bg-gray-300 p-1  "></p>
        </div>
        <div className="flex gap-2 items-cente">
          <p className="text-gray-300 text-xs text-center animate-pulse w-8  bg-gray-300 p-3 rounded-md "></p>
          <p className="text-gray-300 text-xs text-center animate-pulse w-8  bg-gray-300 p-3 rounded-md "></p>
          <p className="text-gray-300 text-xs text-center animate-pulse w-8  bg-gray-300 p-3 rounded-md "></p>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;

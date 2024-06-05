function Skeleton() {
  return (
    <div
      role="status"
      className="bg-secondary shadow-md hover:scale-105 transition ease-out duration-200 hover:shadow-md"
    >
      <div className="flex justify-center items-center  bg-gray-200 h-[270px] animate-pulse"></div>
      <div className="flex justify-between items-start animate-pulse p-3 gap-2">
        <div className="flex flex-col gap-1 animate-pulse leading-6">
          <p className="text-gray-300 text-xs text-center animate-pulse !w-[284px] md:!w-[160px]  bg-gray-300 p-1  "></p>
          <p className="text-gray-300 text-xs text-center animate-pulse !w-[200px] md:!w-[130px]  bg-gray-300 p-1 "></p>
        </div>
        <div className="flex justify-center items-center  bg-gray-200 w-12 p-3 animate-pulse"></div>
      </div>
    </div>
  );
}

export default Skeleton;

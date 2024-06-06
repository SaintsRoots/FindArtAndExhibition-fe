function Skeletn({title}) {
  return (
    <div className="container min-h-screen mx-auto px-6 md:px-14 mt-32 pb-10 flex flex-col gap-2 items-start justify-center">
      <p className="flex items-center bg-gray-300 h-4 w-64 animate-pulse">{title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <div className="bg-gray-300 h-[270px] md:h-[400px] w-full animate-pulse"></div>
        </div>
        <div className="flex flex-col items-start justify-between gap-2 pl-0 lg:pl-10">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-2">
              <div className="flex justify-end w-10 h-10 rounded-full bg-gray-300 p-[2px] animate-pulse"></div>
              <p className="text-sm leading-3 bg-gray-300 h-4 w-20 animate-pulse"></p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs bg-gray-300 h-4 w-32 animate-pulse"></p>
              <small className="text-sm bg-gray-300 h-4 w-40 animate-pulse"></small>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold bg-gray-300 h-6 w-64 animate-pulse"></h1>
            <div className="flex gap-3 items-center">
              <div className="flex text-textColor1">
                <div className="bg-gray-300 h-4 w-4 animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-4 animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-4 animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-4 animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-4 animate-pulse"></div>
              </div>
              <p className="text-sm bg-gray-300 h-4 w-16 animate-pulse"></p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="bg-gray-300 h-4 w-full animate-pulse"></p>
            <p className="bg-gray-300 h-4 w-full animate-pulse"></p>
            <p className="bg-gray-300 h-4 w-full animate-pulse"></p>
            <h1 className="text-xl font-semibold bg-gray-300 h-6 w-32 animate-pulse"></h1>
          </div>
          <div className="bg-gray-300 h-10 w-32 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default Skeletn;

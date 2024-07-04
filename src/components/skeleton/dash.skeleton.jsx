function Skeleton() {
    return (
      <div
        role="status"
        className="flex w-60 flex-wrap gap-2 p-4 justify-center items-center bg-slate-100 rounded-2xl hover:bg-slate-300 hover:border duration-100 translate-x-0 cursor-pointer border-blue-300 animate-pulse"
      >
        <div className="w-full h-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-1/2 h-2 bg-gray-300 rounded animate-pulse mt-2"></div>
      </div>
    );
  }
  
  export default Skeleton;
  
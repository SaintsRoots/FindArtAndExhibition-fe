const DashBoardCard = ({ value, title , currency}) => {
  return (
    <div className="flex flex-wrap  gap-2 p-4 justify-center items-center bg-slate-100 rounded-2xl hover:bg-slate-300 hover:border duration-100 translate-x-0 cursor-pointer border-blue-300 ">
      <p className="text-nowrap text-sm font-semibold">{title} : </p>
      <p className="text-xs font-bold text-slate-500 ">{value} {currency}</p>
    </div>
  );
};

export default DashBoardCard;

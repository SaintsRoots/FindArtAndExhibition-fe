import ArtsCard from "./ArtsCard";
import { artData } from "./JsonData/artsData";
const Architecture = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {artData.slice(0,3).map((item, index) => (
        <ArtsCard
          image={item?.image}
          name={item?.name}
          price={item?.price}
          key={index}
          money="Frw"
        />
      ))}
    </div>
  );
};


export default Architecture
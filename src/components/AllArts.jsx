import ArtsCard from "./ArtsCard";
import { artData } from "./JsonData/artsData";
const AllArts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {artData.slice(0, 8).map((item, index) => (
        <div key={index}>
          <ArtsCard
            image={item?.image}
            name={item?.name}
            price={item?.price}
            key={item?.name}
            money="Frw"
          />
        </div>
      ))}
    </div>
  );
};

export default AllArts;

import ArtsCard from "./ArtsCard";
import { artData } from "./JsonData/artsData";
const Sculpture = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {artData.slice(4, 6).map((item, index) => (
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

export default Sculpture
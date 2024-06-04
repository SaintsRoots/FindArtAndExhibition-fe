import ArtsCard from "./ArtsCard";
import Skeleton from "../components/skeleton/arts.skeleton";
import NoData from "./NoData";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllArts,
  selectAllarts,
  selectArtsloading,
  selectArtsError,
} from "../features/arts/artsSlice";
import { useEffect } from "react";
const Sculpture = () => {
  const dispatch = useDispatch();

  const art = useSelector(selectAllarts);
  const arts = art.filter((product) => product.category === "Sculpture");
  const artsLoading = useSelector(selectArtsloading);
  const artsError = useSelector(selectArtsError);
  useEffect(() => {
    dispatch(getAllArts());
  }, [dispatch]);

  let content;
  if (artsError) {
    content = <p className="text-base text-red-700">Error: {artsError}</p>;
  } else if (artsLoading) {
    content = Array.from({ length: 8 }, (_, index) => <Skeleton key={index} />);
  } else if (arts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col gap-4  justify-center">
        <div className="w-full">
          <NoData />
        </div>
      </div>
    );
  } else if (arts.length > 0) {
    content = arts
      .slice(0, 8)
      .map((item, index) => (
        <ArtsCard
          key={index}
          image={item?.image}
          name={item?.name}
          price={item?.price}
          money="Frw"
        />
      ));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {content}
    </div>
  );
};
export default Sculpture;

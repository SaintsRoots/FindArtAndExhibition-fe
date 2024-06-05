import { useSelector, useDispatch } from "react-redux";
import ArtistCard from "../components/ArtistCard";
import {
  selectAllartist,
  getAllartist,
  selectartistloading,
  selectartistError,
} from "../features/artist/artistSlice";
import { useEffect } from "react";
import NoData from "../components/NoData";
import Skeleton from "../components/skeleton/artists.skeleton";

const ArtistPage = () => {
  const dispatch = useDispatch();
  const artist = useSelector(selectAllartist);
  const artistloading = useSelector(selectartistloading);
  const artistError = useSelector(selectartistError);
  const artists = artist.filter((artist) => artist.status === "approved");
  useEffect(() => {
    dispatch(getAllartist());
  }, [dispatch]);

  let content;
  if (artistError) {
    content = <p className="text-base text-red-700">Error: {artistError}</p>;
  } else if (artistloading) {
    content = Array.from({ length: 4 }, (_, index) => <Skeleton key={index} />);
  } else if (artists.length === 0) {
    return (
      <div className="min-h-screen flex flex-col gap-4  justify-center">
        <div className="w-full">
          <NoData />
        </div>
      </div>
    );
  } else if (artists.length > 0) {
    content = artists.map((artist, index) => (
      <ArtistCard
        name={artist?.name}
        email={artist?.email}
        imgSrc={artist?.profile}
        phone={artist?.phone}
        key={index}
      />
    ));
  }

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-24 gap-4 pt-4 pb-4">
      {content}
    </div>
  );
};

export default ArtistPage;

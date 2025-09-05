import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ArtistCard from "../components/ArtistCard";
import {
  selectAllartist,
  getAllartist,
  selectartistloading,
  selectartistError,
} from "../features/artist/artistSlice";
import NoData from "../components/NoData";
import Skeleton from "../components/skeleton/artists.skeleton";

const ArtistPage = () => {
  const dispatch = useDispatch();
  const artists = useSelector(selectAllartist);
  const isLoading = useSelector(selectartistloading);
  const error = useSelector(selectartistError);

  // Fetch artists only if the data is not already loaded
  useEffect(() => {
    if (!artists.length && !isLoading && !error) {
      dispatch(getAllartist());
    }
  }, [dispatch, artists.length, isLoading, error]);

  // Filter only approved artists
  const approvedArtists = artists.filter(
    (artist) => artist.status === "approved" && artist.role === "Artist"
  );

  let content;
  if (error) {
    content = (
      <div className="col-span-full flex justify-center items-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <p className="text-lg text-red-600">Error loading artists: {error}</p>
          <button
            onClick={() => dispatch(getAllartist())}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  } else if (isLoading) {
    content = Array.from({ length: 8 }, (_, index) => <Skeleton key={index} />);
  } else if (approvedArtists.length === 0) {
    content = (
      <div className="col-span-full flex justify-center items-center py-20">
        <NoData />
      </div>
    );
  } else {
    content = approvedArtists.map((artist) => (
      <ArtistCard
        key={artist._id}
        id={artist._id}
        name={artist.name}
        email={artist.email}
        imgSrc={artist.img}
        status={artist.status}
        role={artist.role}
        createdAt={artist.createdAt}
      />
    ));
  }

  return (
    <div className="w-full">
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {content}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistPage;
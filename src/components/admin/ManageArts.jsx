import Button from "../../components/form/Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllarts,
  selectArtsloading,
  selectArtsError,
  getAllArts,
  deleteArts,
} from "../../features/arts/artsSlice";
import { useEffect, useState } from "react";
import Skeleton from "../skeleton/arts.skeleton";
import Cards from "../dashboard/Cards";
import CreateArtModal from "../dashboard/ArtsModol";
import { Palette } from "lucide-react";

const ManageArts = () => {
  const dispatch = useDispatch();
  const arts = useSelector(selectAllarts);
  const loading = useSelector(selectArtsloading);
  const error = useSelector(selectArtsError);
  const [model, setModal] = useState(false);

  const handleModal = () => {
    setModal(!model);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteArts(id));
    dispatch(getAllArts());
  };

  useEffect(() => {
    dispatch(getAllArts());
  }, [dispatch]);

  let content;
  if (error) {
    content = (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <div className="text-red-600 bg-red-50 border border-red-200 rounded-xl p-4 max-w-md text-center">
          <p className="font-semibold">Error Loading Artworks</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  } else if (loading) {
    content = Array.from({ length: 6 }, (_, index) => <Skeleton key={index} />);
  } else if (arts.length === 0) {
    content = (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Artworks Found
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by adding your first artwork
          </p>
          <Button
            title="Add First Artwork"
            click={handleModal}
            icon={<IoIosAddCircleOutline />}
          />
        </div>
      </div>
    );
  } else {
    content = arts.map((item) => (
      <Cards
        key={item._id}
        id={item._id}
        name={item?.name}
        description={item?.description}
        image={item?.image}
        category={item?.category}
        available_arts={item?.available_arts}
        price={item?.price}
        likes={item?.likes}
        views={item?.views}
        rating={item?.rating}
        deleteArt={handleDelete}
      />
    ));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Artworks</h1>
          <p className="text-gray-600">Create and manage your art collection</p>
        </div>
        <Button
          title="Add New Art"
          click={handleModal}
          styles="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500"
          icon={<IoIosAddCircleOutline className="w-5 h-5" />}
        />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{arts.length}</div>
          <div className="text-sm text-gray-600">Total Artworks</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">
            {arts.filter((art) => art.available_arts > 0).length}
          </div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">
            {arts.reduce((sum, art) => sum + (art.views || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">
            {arts.reduce((sum, art) => sum + (art.likes || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Total Likes</div>
        </div>
      </div>

      {/* Artworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content}
      </div>

      {/* Modal */}
      {model && <CreateArtModal close={handleModal} title="Add New Artwork" />}
    </div>
  );
};

export default ManageArts;

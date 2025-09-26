import Button from "../../components/form/Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import Cards from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllarts,
  selectArtsloading,
  selectArtsError,
  getAllArtsByOwner,
  deleteArts,
} from "../../features/arts/artsSlice";
import { useEffect, useState } from "react";
import Modal from "./ArtsModol";
import Skeleton from "../skeleton/arts.skeleton";

const ManageArt = () => {
  const dispatch = useDispatch();
  const arts = useSelector(selectAllarts);
  const loading = useSelector(selectArtsloading);
  const error = useSelector(selectArtsError);
  const [model, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleModal = () => {
    setModal(!model);
    dispatch(getAllArtsByOwner());
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this art?")) {
      await dispatch(deleteArts(id));
      dispatch(getAllArtsByOwner());
    }
  };

  useEffect(() => {
    dispatch(getAllArtsByOwner());
  }, [dispatch]);

  // Filter arts based on search term
  const filteredArts = arts.filter(art =>
    art.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let content;
  if (error) {
    content = (
      <div className="col-span-full text-center py-12">
        <div className="text-red-600 bg-red-50 p-4 rounded-lg inline-block">
          Error: {error}
        </div>
      </div>
    );
  } else if (loading) {
    content = Array.from({ length: 6 }, (_, index) => <Skeleton key={index} />);
  } else if (filteredArts.length === 0) {
    content = (
      <div className="col-span-full text-center py-12">
        <div className="text-gray-500 text-lg">
          {searchTerm ? "No arts found matching your search." : "No arts found. Start by adding your first artwork!"}
        </div>
      </div>
    );
  } else {
    content = filteredArts.map((item, index) => (
      <Cards
        id={item._id}
        name={item?.name}
        description={item?.description}
        image={item?.image}
        category={item?.category}
        available_arts={item?.available_arts}
        price={item?.price}
        key={index}
        deleteArt={handleDelete}
      />
    ));
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Your Arts</h1>
          <p className="text-gray-600">Create, edit, and manage your artwork collection</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search arts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Button
            title="New Art"
            click={handleModal}
            styles="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            icon={<IoIosAddCircleOutline />}
          />
        </div>
      </div>

      {/* Arts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content}
      </div>

      {model && <Modal close={handleModal} title="Add New Art" />}
    </div>
  );
};

export default ManageArt;
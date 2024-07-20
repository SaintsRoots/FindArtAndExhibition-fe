import React, { useEffect, useState } from "react";
import Skeleton from "../skeleton/artistOrder.skelton";
import {
  selectAllartist,
  getAllartist,
  selectartistloading,
  selectartistError,
  deleteArtist,
} from "../../features/artist/artistSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../form/Button";
import { MdEdit, MdDelete } from "react-icons/md";
import { notifyError, notifySuccess } from "../notifications/notification";
import Spinner from "../Spinner";
import Modal from "./EditUserModal";

const MNgeCustomer = () => {
  const dispatch = useDispatch();
  const artists = useSelector(selectAllartist);
  const loading = useSelector(selectartistloading);
  const errors = useSelector(selectartistError);
  const approvedArtists = artists.filter(
    (artist) => artist.role === "User" 
  );
  const [localLoading, setLocalLoading] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  // Handle modal
  const handleModal = (artist) => {
    setSelectedArtist(artist);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedArtist(null);
  };

  useEffect(() => {
    dispatch(getAllartist());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      setLocalLoading((prev) => ({ ...prev, [id]: true }));
      await dispatch(deleteArtist(id));
      notifySuccess("Deleted Successfully");
      setLocalLoading((prev) => ({ ...prev, [id]: false }));
      await dispatch(getAllartist());
    } catch (error) {
      console.error("Error deleting artist:", error.message);
      notifyError(error.message);
      setLocalLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const thClasses =
    "px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-nowrap";
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-col w-full bg-white">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden min-w-full">
              {loading ? (
                Array.from({ length: 20 }, (_, index) => (
                  <Skeleton key={index} />
                ))
              ) : errors ? (
                <div className="text-red-600">{errors}</div>
              ) : approvedArtists.length === 0 ? (
                <div className="text-gray-600 min-w-full justify-center items-center">
                  No data found
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead>
                    <tr>
                      <th scope="col" className={thClasses}>
                        Name
                      </th>
                      <th scope="col" className={thClasses}>
                        Email
                      </th>
                      <th scope="col" className={thClasses}>
                        Phone
                      </th>
                      <th scope="col" className={thClasses}>
                        Province
                      </th>
                      <th scope="col" className={thClasses}>
                        District
                      </th>
                      <th scope="col" className={thClasses}>
                        Sector
                      </th>
                      <th scope="col" className={thClasses}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {approvedArtists.map((artist, index) => (
                      <tr
                        className="text-sm font-medium text-gray-600"
                        key={index}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {artist?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {artist?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {artist?.phone || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {artist?.province || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {artist?.district || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {artist?.sector || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end flex justify-end gap-2">
                          <Button
                            icon={<MdEdit className="!text-indigo-600" />}
                            styles="!bg-indigo-100"
                            click={() => {
                              handleModal(artist);
                              dispatch(getAllartist());
                            }}
                          />
                          <Button
                            icon={
                              localLoading[artist._id] ? (
                                <Spinner classes={`!h-4`} />
                              ) : (
                                <MdDelete className="!text-red-600" />
                              )
                            }
                            styles="!bg-indigo-100"
                            click={() => {
                              handleDelete(artist?._id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {modalOpen && selectedArtist && (
              <Modal
                close={closeModal}
                id={selectedArtist._id}
                name={selectedArtist.name}
                email={selectedArtist.email}
                img={selectedArtist.img}
                phone={selectedArtist.phone}
                province={selectedArtist.province}
                district={selectedArtist.district}
                sector={selectedArtist.sector}
                street={selectedArtist.street}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MNgeCustomer;

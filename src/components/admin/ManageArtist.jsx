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
import { MdEdit, MdDelete, MdPerson } from "react-icons/md";
import { notifyError, notifySuccess } from "../notifications/notification";
import Spinner from "../Spinner";
import Modal from "./EditUserModal";

const ManageArtist = () => {
  const dispatch = useDispatch();
  const artists = useSelector(selectAllartist);
  const loading = useSelector(selectartistloading);
  const errors = useSelector(selectartistError);
  const approvedArtists = artists.filter(
    (artist) => artist.status === "approved" && artist.role === "Artist"
  );
  const [localLoading, setLocalLoading] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

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
      notifySuccess("Artist deleted successfully");
      dispatch(getAllartist());
    } catch (error) {
      notifyError(error.message || "Failed to delete artist");
    } finally {
      setLocalLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const thClasses = "px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Artists</h1>
        <p className="text-gray-600">Manage approved artists on the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">{approvedArtists.length}</div>
          <div className="text-sm text-gray-600">Approved Artists</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">
            {artists.filter(a => a.status === "pending").length}
          </div>
          <div className="text-sm text-gray-600">Pending Requests</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {artists.filter(a => a.status === "approved").length}
          </div>
          <div className="text-sm text-gray-600">Total Approved</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            Array.from({ length: 5 }, (_, index) => <Skeleton key={index} />)
          ) : errors ? (
            <div className="p-6 text-red-600 bg-red-50 rounded-lg">{errors}</div>
          ) : approvedArtists.length === 0 ? (
            <div className="p-12 text-center">
              <MdPerson className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Artists Found</h3>
              <p className="text-gray-600">No approved artists on the platform yet.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={thClasses}>Artist</th>
                  <th className={thClasses}>Contact</th>
                  <th className={thClasses}>Location</th>
                  <th className={thClasses}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {approvedArtists.map((artist) => (
                  <tr key={artist._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {artist?.name?.charAt(0) || "A"}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{artist?.name || "N/A"}</div>
                          <div className="text-sm text-gray-500">{artist?.email || "N/A"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{artist?.email || "N/A"}</div>
                      <div className="text-sm text-gray-500">{artist?.phone || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {[artist?.province, artist?.district, artist?.sector].filter(Boolean).join(", ") || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleModal(artist)}
                          className="text-purple-600 hover:text-purple-900 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                          title="Edit Artist"
                        >
                          <MdEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(artist._id)}
                          disabled={localLoading[artist._id]}
                          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete Artist"
                        >
                          {localLoading[artist._id] ? (
                            <Spinner classes="w-4 h-4" />
                          ) : (
                            <MdDelete className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
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
  );
};

export default ManageArtist;
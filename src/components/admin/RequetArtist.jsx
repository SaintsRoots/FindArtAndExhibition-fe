import React, { useEffect, useState } from "react";
import Skeleton from "../skeleton/artistOrder.skelton";
import {
  selectAllartist,
  getAllartist,
  selectartistloading,
  selectartistError,
  approveArtist,
  cancelArtist,
} from "../../features/artist/artistSlice";
import { useDispatch, useSelector } from "react-redux";
import { CheckCheck, UserPlus } from "lucide-react";
import { FaExpand } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { notifyError, notifySuccess } from "../notifications/notification";
import Spinner from "../Spinner";
import Modal from "./ExpandData";

const RequetArtist = () => {
  const dispatch = useDispatch();
  const artists = useSelector(selectAllartist);
  const loading = useSelector(selectartistloading);
  const errors = useSelector(selectartistError);
  const pendingArtists = artists.filter(
    (artist) => artist.status === "pending" && artist.role === "Artist"
  );
  const [localLoading, setLocalLoading] = useState({});
  const [localLoadingi, setLocalLoadingi] = useState({});
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

  const handlCancel = async (id) => {
    try {
      setLocalLoadingi((prev) => ({ ...prev, [id]: true }));
      await dispatch(cancelArtist(id));
      notifySuccess("Request cancelled successfully");
      dispatch(getAllartist());
    } catch (error) {
      notifyError(error.message || "Failed to cancel request");
    } finally {
      setLocalLoadingi((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handlRequest = async (id) => {
    try {
      setLocalLoading((prev) => ({ ...prev, [id]: true }));
      await dispatch(approveArtist(id));
      notifySuccess("Artist approved successfully");
      dispatch(getAllartist());
    } catch (error) {
      notifyError(error.message || "Failed to approve artist");
    } finally {
      setLocalLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Artist Requests</h1>
        <p className="text-gray-600">Review and manage artist registration requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="text-2xl font-bold text-orange-600">{pendingArtists.length}</div>
          <div className="text-sm text-gray-600">Pending Requests</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {artists.filter(a => a.status === "approved").length}
          </div>
          <div className="text-sm text-gray-600">Approved Artists</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            Array.from({ length: 5 }, (_, index) => <Skeleton key={index} />)
          ) : errors ? (
            <div className="p-6 text-red-600 bg-red-50 rounded-lg">{errors}</div>
          ) : pendingArtists.length === 0 ? (
            <div className="p-12 text-center">
              <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Requests</h3>
              <p className="text-gray-600">All artist requests have been processed.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Artist</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingArtists.map((artist) => (
                  <tr key={artist._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                          {artist?.name?.charAt(0) || "A"}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{artist?.name}</div>
                          <div className="text-sm text-gray-500">{artist?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{artist?.email}</div>
                      <div className="text-sm text-gray-500">{artist?.phone || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {[artist?.province, artist?.district].filter(Boolean).join(", ") || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlRequest(artist._id)}
                          disabled={localLoading[artist._id]}
                          className="flex items-center px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                          title="Approve Artist"
                        >
                          {localLoading[artist._id] ? (
                            <Spinner classes="w-4 h-4 mr-1" />
                          ) : (
                            <CheckCheck className="w-4 h-4 mr-1" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handlCancel(artist._id)}
                          disabled={localLoadingi[artist._id]}
                          className="flex items-center px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                          title="Reject Request"
                        >
                          {localLoadingi[artist._id] ? (
                            <Spinner classes="w-4 h-4 mr-1" />
                          ) : (
                            <TiCancel className="w-4 h-4 mr-1" />
                          )}
                          Reject
                        </button>
                        <button
                          onClick={() => handleModal(artist)}
                          className="p-2 text-purple-600 hover:text-purple-900 rounded-lg hover:bg-purple-50 transition-colors"
                          title="View Details"
                        >
                          <FaExpand className="w-4 h-4" />
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
          image={selectedArtist.img}
          email={selectedArtist.email}
        />
      )}
    </div>
  );
};

export default RequetArtist;
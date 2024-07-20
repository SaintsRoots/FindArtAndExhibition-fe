
import React, { useEffect, useState } from "react";
import Skeleton from "../skeleton/artistOrder.skelton";
import {
  selectAllartist,
  getAllartist,
  selectartistloading,
  selectartistError,
  approveArtist,
} from "../../features/artist/artistSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../form/Button";
import { IoMdDoneAll } from "react-icons/io";
import { notifyError, notifySuccess } from "../notifications/notification";
import Spinner from "../Spinner";

const RequetArtist = () => {
  const dispatch = useDispatch();
  const artists = useSelector(selectAllartist);
  const loading = useSelector(selectartistloading);
  const errors = useSelector(selectartistError);
  const artist = artists.filter((artist) => artist.status === "pending" && artist.role === "Artist");
  const [localLoading, setLocalLoading] = useState({});

  useEffect(() => {
    dispatch(getAllartist());
  }, [dispatch]);

  const handlRequest = async (id) => {
    try {
      setLocalLoading((prev) => ({ ...prev, [id]: true }));
      await dispatch(approveArtist(id));
      notifySuccess("Aproved Successfully");
      setLocalLoading((prev) => ({ ...prev, [id]: false }));
      await dispatch(getAllartist());
    } catch (error) {
      console.error("Error Approving artist:", error.message);
      notifyError(error.message);
      setLocalLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const thClasses =
    "px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-nowrap";
  return (
    <div className="flex flex-col gap-2 ">
        <h2>All Reqest From Artist</h2>
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
              ) : artist.length === 0 ? (
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
                    {artist.map((artists, index) => (
                      <tr
                        className="text-sm font-medium text-gray-600"
                        key={index}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {artists?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {artists?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {artists?.phone || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {artists?.province || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {artists?.district || "N/A"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {artists?.sector || "N/A"}
                        </td>
                        <td className=" py-4 whitespace-nowrap text-end flex justify-center gap-2">

                          <Button
                            icon={
                              localLoading[artists._id] ? (
                                <Spinner classes={`!h-4`} />
                              ) : (
                                <IoMdDoneAll className="!text-primary font-bold " />
                              )
                            }
                            styles="!bg-indigo-100"
                            click={() => {
                              handlRequest(artists?._id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequetArtist;

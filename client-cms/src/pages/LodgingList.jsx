import axios from "axios";
import { baseUrl } from "../constant/baseUrl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import Button from "../components/Button";

export default function LodgingList() {
  const [loading, setLoading] = useState(false);
  const [lodgings, setLodgings] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/lodgings`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setLodgings(data.data);
    } catch (error) {
      showErrorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`${baseUrl}/lodgings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      showSuccessToast(res.data.message);

      fetchData();
    } catch (error) {
      showErrorToast(error.response?.data?.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center p-6 gap-4">
        <h1 className="text-2xl font-bold">Lodging List</h1>
        <div className="flex flex-row justify-between w-full">
          <Button
            btnName={"Add Lodging"}
            btnColor={"btn-primary"}
            onClick={() => navigate(`/lodgings/add`)}
          />
        </div>

        {loading ? (
          <>
            <div className="flex justify-center mt-28">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          </>
        ) : (
          <div className="w-full">
            <table className="table table-xs table-zebra border border-base-content/5 ">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Facility</th>
                  <th>Room Capacity</th>
                  <th>Image URL</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Type Id</th>
                  <th>Author Id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lodgings.map((lodging, i) => {
                  return (
                    <tr key={lodging.id || i}>
                      <th>{lodging.id}</th>
                      <td className="font-semibold">{lodging.name}</td>
                      <td>{lodging.facility}</td>
                      <td>{lodging.roomCapacity}</td>
                      <td>
                        <div className="avatar">
                          <div className="w-12 h-12 rounded">
                            <img src={lodging.imgUrl} alt={lodging.name} />
                          </div>
                        </div>
                      </td>
                      <td>{lodging.location}</td>
                      <td>IDR {lodging.price?.toLocaleString()}</td>
                      <td>{lodging.typeId}</td>
                      <td>{lodging.authorId}</td>
                      <td>{lodging.User?.username}</td>
                      <td>{lodging.User?.email}</td>
                      <td>
                        <div className="flex gap-2 justify-center">
                          <Button
                            btnName="Edit"
                            btnColor="btn-warning"
                            onClick={() =>
                              navigate(`/lodgings/edit/${lodging.id}`)
                            }
                          />
                          <Button
                            btnName="Delete"
                            btnColor="btn-error"
                            onClick={() => handleDelete(lodging.id)}
                          />
                          <Button
                            btnName="Upload"
                            btnColor="btn-info"
                            onClick={() =>
                              navigate(`/lodgings/upload/${lodging.id}`)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

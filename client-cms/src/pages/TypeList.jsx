import axios from "axios";
import { baseUrl } from "../constant/baseUrl";
import { useEffect, useState } from "react";
import { showErrorToast } from "../utils/toast";

export default function TypeList() {
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([]);

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/types`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setTypes(data.data);
    } catch (error) {
      showErrorToast(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col p-6 gap-4">
        <h1 className="text-2xl font-bold">Type List</h1>

        {loading ? (
          <>
            <div className="flex justify-center mt-28">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          </>
        ) : (
          <div className="overflow-x-auto-full">
            <table className="table table-zebra border border-base-content/5 ">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {types.map((type, i) => {
                  return (
                    <tr key={type.id || i}>
                      <th>{type.id}</th>
                      <td className="font-semibold">{type.name}</td>
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

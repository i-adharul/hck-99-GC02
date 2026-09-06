import axios from "axios";
import { baseUrl } from "../constant/baseUrl";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../components/Button";
import { showErrorToast, showSuccessToast } from "../utils/toast";

export default function UploadLodgingImage() {
  const { id } = useParams();

  const [detail, setDetail] = useState({ name: "" });

  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  async function fetchDetail() {
    try {
      const resDetail = await axios.get(`${baseUrl}/lodgings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setDetail(resDetail.data.data);
    } catch (error) {}
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleForm(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.patch(`${baseUrl}/lodgings/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showSuccessToast(res.data.message);

      navigate(`/`);
    } catch (error) {
      showErrorToast(error.response?.data?.message);
    }
  }

  useEffect(() => {
    fetchDetail();
  }, [id]);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen p-6 gap-4">
        <h1>TiketStays CMS</h1>

        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img src={detail.imgUrl} alt={detail.name} />
          </figure>
          <div className="card-body items-center">
            <h2 className="card-title">{detail.name}</h2>
            <form onSubmit={handleForm}>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <label className="label">Upload New Image</label>
                <input
                  type="file"
                  className="file-input"
                  onChange={handleFileChange}
                  accept="image/*"
                />

                <Button
                  btnName="Upload"
                  btnColor={"btn-neutral"}
                  type="submit"
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

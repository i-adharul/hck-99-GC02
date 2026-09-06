import axios from "axios";
import { baseUrl } from "../constant/baseUrl";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import LodgingForm from "../components/LodgingForm";

export default function EditLodging() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState({
    name: "",
    facility: "",
    roomCapacity: "",
    imgUrl: "",
    location: "",
    price: "",
    typeId: "",
    authorId: "",
  });

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

  async function handleForm(e, detail) {
    e.preventDefault();

    try {
      const res = await axios.put(`${baseUrl}/lodgings/${id}`, detail, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      showSuccessToast(res.data.message);

      navigate(`/lodgings`);
    } catch (error) {
      showErrorToast(error.response?.data?.message);
    }
  }

  useEffect(() => {
    fetchDetail();
  }, [id]);

  return (
    <>
      <LodgingForm
        name={"Edit"}
        currentLodging={detail}
        handleForm={handleForm}
      />
    </>
  );
}

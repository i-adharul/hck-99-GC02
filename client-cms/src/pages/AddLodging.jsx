import axios from "axios";
import { baseUrl } from "../constant/baseUrl";
import { useNavigate } from "react-router";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import LodgingForm from "../components/LodgingForm";

export default function AddLodging() {
  const navigate = useNavigate();

  async function handleForm(e, lodging) {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseUrl}/lodgings`, lodging, {
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

  return (
    <>
      <LodgingForm name={"Add"} handleForm={handleForm} />
    </>
  );
}

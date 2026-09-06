import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { baseUrl } from "../constant/baseUrl";
import { showErrorToast } from "../utils/toast";
import Navbar from "../components/Navbar";
import LodgingCard from "../components/LodgingCard";

export default function LodgingDetail() {
  const { id } = useParams();
  const [lodging, setLodging] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dummy data untuk tampilan detail
  const checkInProcedure =
    "Extra-person charges may apply and vary depending on property policy. Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges. Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed and are subject to availability upon check-in. This property does not accommodate certain age groups without a parent or legal guardian present.";
  const morePolicies =
    "Guests of all ages are welcome to stay. Children ages 16 years old and above will be considered as adults. Please make sure that the children's age is consistent with the information listed on your booking details. Otherwise, you may have to pay additional fees upon check-in. No pets allowed. No smoking room. Alcohol drinks allowed. Breakfast is available from 06:00 - 10:00 local time.";

  async function fetchLodgingDetail() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/lodgings/${id}`);
      setLodging(data.data);
    } catch (error) {
      showErrorToast(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLodgingDetail();
  }, [id]);

  if (loading || !lodging) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 space-y-4">
        {/* Hotel Image */}
        <div className="rounded-xl overflow-hidden">
          <img
            src={lodging.imgUrl}
            alt={lodging.name}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Hotel Info (reuse Card) */}
        <LodgingCard lodging={lodging} detail={true} />

        {/* Lihat Ruangan Button */}
        <button type="button" className="btn btn-primary w-full">
          Lihat Ruangan
        </button>

        {/* Accommodation Detail */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body">
            <h2 className="text-lg font-bold mb-2">Accommodation Rules</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-1">Check-in Procedure</h3>
                <p className="text-sm opacity-80 whitespace-pre-line">
                  {checkInProcedure}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">More Policies</h3>
                <p className="text-sm opacity-80 whitespace-pre-line">
                  {morePolicies}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

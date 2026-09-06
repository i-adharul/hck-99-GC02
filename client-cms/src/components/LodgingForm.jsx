import axios from "axios";
import { baseUrl } from "../constant/baseUrl";
import { useState, useEffect } from "react";
import Button from "./Button";

export default function LodgingForm({ name, currentLodging, handleForm }) {
  const [types, setTypes] = useState([]);

  const [lodging, setLodging] = useState({
    name: "",
    facility: "",
    roomCapacity: 2,
    imgUrl: "",
    location: "",
    price: 150_000,
    typeId: 1,
    authorId: 1,
  });

  useEffect(() => {
    if (currentLodging) {
      setLodging({
        name: currentLodging.name,
        facility: currentLodging.facility,
        roomCapacity: currentLodging.roomCapacity,
        imgUrl: currentLodging.imgUrl,
        location: currentLodging.location,
        price: currentLodging.price,
        typeId: currentLodging.typeId,
        authorId: currentLodging.authorId,
      });
    }
  }, [currentLodging]);

  function setForm(key, value) {
    setLodging((pValue) => {
      return {
        ...pValue,
        [key]: value,
      };
    });
  }

  async function fetchTypes() {
    try {
      const resTypes = await axios.get(`${baseUrl}/types`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setTypes(resTypes.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <>
      <form onSubmit={(e) => handleForm(e, lodging)}>
        <div className="flex flex-col justify-center items-center min-h-screen p-6 gap-4">
          <h1>{name} Lodging</h1>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Grand Mercure Jakarta Harmoni"
              value={lodging.name}
              onChange={(e) => {
                setForm("name", e.target.value);
              }}
            />

            <label className="label">Faicility</label>
            <textarea
              className="textarea"
              rows={3}
              placeholder="AC, Swimming Pool, Free WiFi, Restaurant, Gym, 24-Hour Front Desk"
              value={lodging.facility}
              onChange={(e) => {
                setForm("facility", e.target.value);
              }}
            ></textarea>

            <label className="label">Room Capacity</label>
            <input
              type="number"
              className="input"
              placeholder="2"
              value={lodging.roomCapacity}
              onChange={(e) => {
                setForm("roomCapacity", e.target.value);
              }}
            />

            <label className="label">Image URL</label>
            <input
              type="text"
              className="input"
              placeholder="Image URL"
              value={lodging.imgUrl}
              onChange={(e) => {
                setForm("imgUrl", e.target.value);
              }}
            />

            <label className="label">Location</label>
            <input
              type="text"
              className="input"
              placeholder="Jakarta"
              value={lodging.location}
              onChange={(e) => {
                setForm("location", e.target.value);
              }}
            />

            <label className="label">Price</label>
            <input
              type="number"
              className="input"
              placeholder="75000"
              value={lodging.price}
              onChange={(e) => {
                setForm("price", e.target.value);
              }}
            />

            <label className="label">Type</label>
            <select
              className="input"
              value={lodging.typeId}
              onChange={(e) => {
                setForm("typeId", e.target.value);
              }}
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

            <Button
              btnName={`${name} Lodging`}
              btnColor={"btn-primary"}
              type="submit"
            />
          </fieldset>
        </div>
      </form>
    </>
  );
}

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PetList = () => {
  const [petData, setPetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://vetbee-backend.glitch.me/v1/pets");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPetData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://vetbee-backend.glitch.me/v1/pets/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete pet");
      }

      setPetData((prevData) => prevData.filter((pet) => pet.id !== id));
    } catch (error) {
      console.error("Error deleting pet:", error.message);
    }
  };

  return (
    <>
      <div className="petList">
        <div className="header">
          <h1>Pet list</h1>
          <Link className="button" to="/AddPet">
            ADD PET
          </Link>
        </div>
        <div className="cards">
          {petData.map((pet) => (
            <div className="card" key={pet.id}>
              <h1>{pet.name}</h1>
              <p>{formatDate(pet.dob)}</p>
              <p>{pet.client_email}</p>
              <div className="buTtons">
                <Link className="viewLog" to={`/ViewLog/${pet.id}`}>
                  VIEW LOG
                </Link>
                <button className="delete" onClick={() => handleDelete(pet.id)}>
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PetList;

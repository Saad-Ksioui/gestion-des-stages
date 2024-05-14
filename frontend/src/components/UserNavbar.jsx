import { Link } from "react-router-dom";
import { icons } from "../constants";
import axios from 'axios';
import { useEffect, useState } from "react";
import Settings from "./Settings";

const UserNavbar = () => {
  const [User, setUser] = useState([]);
  const storedData = localStorage.getItem("sessionToken");
  let storedId;

  try {
    if (storedData) {
      storedId = storedData.split(",");
    }
  } catch (error) {
    console.error('Error parsing session token:', error);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${storedId[1]}`);
        setUser(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const Logout = () => {
    localStorage.removeItem("sessionToken");
    window.location.href = "http://localhost:5173/";
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="px-10 flex items-center justify-end h-full">
      <div className="flex items-center gap-10">
        <div>
          <button onClick={Logout}>
            <img src={icons.Logout} alt="" onClick={() => Logout} />
          </button>
        </div>
        <div>
          <Link to="/profile">
            <img src={`images/${User.img_url}`} className="size-12 object-cover rounded-full" alt="" />
          </Link>
        </div>
        <div>
          <button onClick={isModalOpen ? handleCloseModal : handleOpenModal}>
            <img src={icons.Settings} alt="" />
          </button>
        </div>

      </div>
      {
        isModalOpen && (
          <Settings/>
        )
      }
    </section>
  )
};

export default UserNavbar

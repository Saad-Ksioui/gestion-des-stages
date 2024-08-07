import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LuCheckCircle } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import AddResp from "../../components/AdminForms/AddResp";
import UserLayout from "../../layouts/UserLayout";

const ListeResps = () => {
  const containerRef = useRef(null);
  const [users, setUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredResps, setFilteredResps] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response1 = await axios.get(`http://127.0.0.1:8000/api/auth/users`);
        setUsers(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers()
  }, [])
  console.log(users);



  useEffect(() => {
    const containerHeight = containerRef.current.clientHeight;
    const childrenHeight = containerRef.current.scrollHeight;
    if (childrenHeight > containerHeight) {
      containerRef.current.classList.add('overflow-y-scroll');
    } else {
      containerRef.current.classList.remove('overflow-y-scroll');
    }

  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Filter users based on search title
    const filtered = users.filter(user =>
      user.type_utilisateur === 'responsable pédagogique' &&
      user.nom.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setFilteredResps(filtered);
  }, [searchTitle, users]);


  return (
    <UserLayout>
      <section className={`px-10 mt-10 ${isModalOpen ? 'opacity-25' : ''}`}>
        <div className="flex justify-between items-center mt-5 mb-10">
          <h1 className="text-4xl font-bold">Liste des Responsables</h1>
          <button onClick={handleOpenModal} className="flex items-center gap-4 rounded-lg px-4 py-2 bg-black text-white">
            <FaPlus />
            <span>Ajouter</span>
          </button>
        </div>
        <div className="my-6 flex items-center justify-center">
          <form className="w-[425px] h-[72px] flex justify-between items-center px-3 border border-[#D6D6D6] rounded-xl bg-[#F6F6F6]">
            <input type="text" value={searchTitle}
              onChange={e => setSearchTitle(e.target.value)} placeholder="Tapez quelque chose...." className="outline-none rounded-xl bg-[#F6F6F6] placeholder:text-[#999999] text-black pl-2" />
            <button type="submit" className="p-3 text-white bg-black rounded-xl">Rechercher</button>
          </form>
        </div>
        <div className="p-3 hidden lg:block border border-gray-400 rounded-lg max-h-[440px]" ref={containerRef}>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="px-2 overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Id</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Nom Complet</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Téléphone</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredResps.map((responsable, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {responsable._id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {responsable.nom}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {responsable.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {responsable.telephone}
                            </td>
                            <td className={`px-6 py-4 flex justify-start gap-5 whitespace-nowrap font-medium text-2xl text-[#00FF00] `}>
                              <LuCheckCircle />
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden grid grid-cols-1 gap-4 mb-10 p-4 bg-white rounded-lg border shadow-md">
          <ul role="list" className="divide-y divide-gray-200">
            {filteredResps.map((resp, index) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full object-cover" src={`/images_cv/${resp.img_url}`} alt="Neil image" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 ">
                      {resp.nom}
                    </p>
                    <p className="text-sm text-gray-500 truncate ">
                      {resp.email}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </section>
      <AddResp
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </UserLayout>
  )
};

export default ListeResps

import { useEffect, useRef, useState } from "react";
import { icons } from "../../constants";
import UserLayout from "../../layouts/UserLayout";
import { FaPlus, FaDownload, FaPen, FaTrash } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import AjouterDoc from "./AjouterDoc";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

const Documents = () => {
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Documents, setDocuments] = useState([]);

  // Retrieve and validate the stored session token and ID
  const storedData = localStorage.getItem("sessionToken");
  const storedId = storedData ? storedData.split(",")[1] : null;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/documents/user/${storedId}`);
        setDocuments(response.data);

        // Set scroll behavior based on content height
        if (containerRef.current) {
          const containerHeight = containerRef.current.clientHeight;
          const childrenHeight = containerRef.current.scrollHeight;
          if (childrenHeight > containerHeight) {
            containerRef.current.classList.add('overflow-y-scroll');
          } else {
            containerRef.current.classList.remove('overflow-y-scroll');
          }
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Error fetching documents. Please try again later.");
      }
    };

    fetchDocuments();
  }, [isModalOpen]);

  const deleteDocs = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/documents/delete/${id}`);
      toast.success("Document deleted successfully");
      setDocuments(Documents.filter(document => document._id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Error deleting document. Please try again.");
    }
  };

  return (
    <UserLayout>
      <section className="px-10 mt-10">
        <div className="flex justify-between items-center mt-5 mb-10">
          <h1 className="text-4xl font-bold">Documents</h1>
          <button onClick={handleOpenModal} className="flex items-center gap-4 rounded-lg px-4 py-2 bg-black text-white" aria-label="Add Document">
            <FaPlus />
            <span>Ajouter</span>
          </button>
        </div>
        <div className="hidden lg:block p-3 border border-gray-400 rounded-lg max-h-[440px] overflow-y-auto" ref={containerRef}>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="px-2 overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Type</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Created at</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Version</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Download</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Documents.map((doc, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap block w-52 truncate text-sm font-medium text-gray-800">
                            {doc.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap gap-1">
                            {moment(doc.created_at).fromNow()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            <div className={`flex items-center ${doc.version === 'Dernier version' ? 'bg-[#26CB8F]' : 'bg-[#327AF8]'} text-white w-fit px-2 py-1 rounded-lg`}>
                              {doc.version}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            <a href={`/docs/${doc.file}`} className="flex items-center gap-2" download>
                              <FaDownload className="text-lg" />
                              <span>Télécharger</span>
                            </a>
                          </td>
                          <td className="px-6 py-4 flex items-center gap-5 whitespace-nowrap text-sm text-gray-800">
                            <a href="#" aria-label="More Information">
                              <img src={icons.Info} alt="Info" />
                            </a>
                            <button onClick={() => deleteDocs(doc._id)} aria-label="Delete Document">
                              <img src={icons.Delete} alt="Delete" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden grid grid-cols-1 gap-4 mb-10">
          {Documents.map((doc, i) => (
            <div key={i} className="bg-black pt-3 rounded-xl">
              <div className="rounded-xl shadow-xl p-5 bg-white flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#1b212d]">{doc.type}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-[#CCEDED] text-[#069F9F] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                    <MdTimer className="text-xl" />
                    <span className="font-semibold">{moment(doc.created_at).fromNow()}</span>
                  </div>
                  <div className={`flex items-center ${doc.version === 'Dernier version' ? 'bg-[#26CB8F]' : 'bg-[#327AF8]'} text-white w-fit px-2 py-1 rounded-lg`}>
                    {doc.version}
                  </div>
                  <a href={`/docs/${doc.file}`} className="flex items-center gap-2" download>
                    <FaDownload className="text-lg" />
                    <span>Télécharger</span>
                  </a>
                </div>
                <div className="flex justify-end items-end gap-5">
                  <button className="py-2 px-4 rounded-lg border-2 border-green-600 hover:bg-green-600 hover:text-white transition duration-200 font-medium flex items-center gap-2">
                    Modifier
                    <FaPen />
                  </button>
                  <button onClick={() => deleteDocs(doc._id)} className="py-2 px-4 rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transition duration-200 font-medium flex items-center gap-2">
                    Delete
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {isModalOpen && (
        <AjouterDoc handleCloseModal={handleCloseModal} />
      )}
    </UserLayout>
  );
};

export default Documents;

import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import { centres } from '../data/ofppt'

const VerifyStg = ({ handleCloseModal, handleRegister }) => {
  const [codeInsc, setCodeInsc] = useState('')
  const [centre, setCentre] = useState('')

  const handleVerify = (e) => {
    e.preventDefault()

    const emptyFields = [codeInsc, centre].filter(field => field === '').length > 0;

    if (emptyFields) {
      Swal.fire({
        iconColor: "black",
        icon: "error",
        title: "Oops…",
        text: "Please fill in all required fields.",
        confirmButtonColor: "black"
      });
      return;
    }
    else {
      const StagiaireData = {
        codeInsc: codeInsc,
        centre: centre,
      }

      console.log("Data", StagiaireData);

      handleRegister()
      handleCloseModal();

      setCodeInsc('')
      setCentre('')

    }
  }
  return (
    <div className="absolute top-0 bottom-0 mx-auto mt-20 w-full h-[395px] font-poppins">
      <div className="bg-[#f8f8f8] rounded-lg shadow-md w-1/4 px-10 py-5 ">
        <div className="w-full h-fit">
          <div className="flex justify-between items-center pb-3 border-b-[1px] border-black">
            <h1 className="text-center text-3xl font-semibold">Vérifiez vos informations</h1>
            <FaXmark onClick={handleCloseModal} className="text-2xl cursor-pointer"/>
          </div>
          <form onSubmit={handleVerify} className="mt-4">
            <div className="p-3 flex flex-col gap-2">
              <label htmlFor="inscriptionCode" className="text-xl font-medium">Code d'inscription:</label>
              <input type="text" value={codeInsc} onChange={e => setCodeInsc(e.target.value)} id="inscriptionCode" name="inscriptionCode" className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" />
            </div>

            <div className="p-3 flex flex-col gap-2">
              <label htmlFor="centre" className="text-xl font-medium">Diplôme:</label>
              <select id="centre" name="centre" value={centre} onChange={e => setCentre(e.target.value)}  className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none">
                <option>Séléctionnez votre centre</option>
                {
                  centres?.map((centre)=>(
                    <option value={centre.Centre}>{centre.Centre}</option>
                  ))
                }
              </select>
            </div>
            <div className="p-3">
              <button type="submit" className="bg-black py-2 px-4 text-white rounded-xl flex items-center justify-center w-full mt-2 text-lg">
                Vérifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default VerifyStg;

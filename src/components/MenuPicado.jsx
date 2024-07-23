import { useState } from "react";
import RecordsModal from "./RecordsModal";

export default function MenuPicado() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex">
        <button className="btn join-item m-2">Registrar</button>
        <button onClick={handleOpenModal} className="btn join-item m-2">Historial</button>
        <button className="btn join-item m-2">Eficiencia</button>
      </div>

      {isModalOpen && <RecordsModal onClose={handleCloseModal} />}
    </>
  );
}


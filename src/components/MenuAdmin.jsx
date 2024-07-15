import { useGlobalContext } from "../context/UserContext";
import { useState } from "react";

export default function MenuAdmin() {
    const { isVisible, toggleVisibility, toggleVisibilityMachine, isVisibleMachine, toggleVisibilityReference,isVisibleReference } = useGlobalContext();
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (button) => {
        if (selectedButton === button) {
            setSelectedButton(null);
        } else {
            setSelectedButton(button);
        }
    };

    return (
        <>
      

            <div className="flex flex-wrap justify-center">
                <button
                    className={`btn join-item m-2 ${selectedButton === 'user' ? 'bg-red-500 text-white' : ''}`}
                    onClick={() => { handleButtonClick('user'); toggleVisibility(); }}
                >
                    {isVisible ? 'Ocultar formulario' : 'Registrar Usuario'}
                </button>
                <button
                    className={`btn join-item m-2 ${selectedButton === 'machine' ? 'bg-red-500 text-white' : ''}`}
                    onClick={() => { handleButtonClick('machine'); toggleVisibilityMachine(); }}
                >
                    {isVisibleMachine ? 'Ocultar formulario' : 'Registrar Maquina'}
                </button>
                <button
                    className={`btn join-item m-2 ${selectedButton === 'reference' ? 'bg-red-500 text-white' : ''}`}
                    onClick={() => { handleButtonClick('reference'); toggleVisibilityReference(); }}
                >
                    {isVisibleReference ? 'Ocultar formulario' : 'Registrar Referencia'}
                </button>
                
            </div>
            
        </>
    );
}

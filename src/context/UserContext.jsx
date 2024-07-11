/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const useGlobalContext =()=>useContext(GlobalContext);

const UserContext = ({children})=>{
  // Estado para crear usuarios
    const [user, setUser] = useState({
        codigo: '',
        nombres: '',
        apellidos: '',
        usuario: ''
      });

     // Estado para controlar la visibilidad del componente
  const [isVisible, setIsVisible] = useState(false);

  // Función para alternar la visibilidad del componente
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };



      return (
        <GlobalContext.Provider value={{ user, setUser,isVisible ,setIsVisible,toggleVisibility}}>
          {children}
        </GlobalContext.Provider>
      );
};

export default UserContext;
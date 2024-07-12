/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const useGlobalContext =()=>useContext(GlobalContext);

const UserContext = ({children})=>{
//data machines
const [data, setData] = useState([]);
useEffect(() => {
  fetch('http://localhost:3000/api/machines/')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data);
      setData(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}, []);

//data users
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/users/')
     .then(response => response.json())
     .then(data => {
       console.log('Fetched data:', data);
       setUsersData(data);
     })
     .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Estado para crear usuarios
    const [user, setUser] = useState({
        codigo: '',
        nombres: '',
        apellidos: '',
        usuario: ''
      });

      // Estado para crear maquinas
      const [machine, setMachine] = useState({
        id_maquinas: '',
        nombre_maquina: '',
        capacidad: ''
      });

      // Estado para controlar la visibilidad del componente

     // Estado para controlar la visibilidad del componente
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleMachine, setIsVisibleMachine] = useState(false);

  // Función para alternar la visibilidad del componente
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const toggleVisibilityMachine = () => {
    setIsVisibleMachine(!isVisibleMachine);
  };



      return (
        <GlobalContext.Provider value={{ 
          user, 
          setUser,
          isVisible ,
          setIsVisible,
          toggleVisibility, 
          isVisibleMachine,
          setIsVisibleMachine,
          toggleVisibilityMachine,
           machine,
           setMachine,
           data,
           setData,
           usersData,
           setUsersData,
          
           }}>
          {children}
        </GlobalContext.Provider>
      );
};

export default UserContext;
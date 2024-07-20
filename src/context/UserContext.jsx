/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const useGlobalContext =()=>useContext(GlobalContext);

const UserContext = ({children})=>{

  //Ruta conexiones
  const rutaLocal = 'http://localhost:3000/api/';

 


//data machines
const [data, setData] = useState([]);
useEffect(() => {
  fetch('http://localhost:3000/api/machines/')
    .then(response => response.json())
    .then(data => {
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
       setUsersData(data);
     })
     .catch(error => console.error('Error fetching data:', error));
  }, []);

  //data references
  const [referencesData, setReferencesData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/reference/')
     .then(response => response.json())
     .then(data => {
       setReferencesData(data);
     })
     .catch(error => console.error('Error fetching data:', error));
  }, []);

  //Assignament
  const [assignamentData, setAssignament] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/assignaments/')
     .then(response => response.json())
     .then(data => {
       setAssignament(data);
     })
     .catch(error => console.error('Error fetching data:', error));
  }, []);
   //all assign
   const [allassignamentData, setAllAssignament] = useState([]);
   useEffect(() => {
     fetch('http://localhost:3000/api/allassign/')
      .then(response => response.json())
      .then(data => {
        setAllAssignament(data);
      })
      .catch(error => console.error('Error fetching data:', error));
   }, []);

   // registers
   const [registerData, setRegisterData] = useState([]);
   useEffect(() => {
     fetch('http://localhost:3000/api/user-machines/')
      .then(response => response.json())
      .then(data => {
        setRegisterData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
   }, []);



  //  prueba

  const [pruebaData, setPruebaData] = useState([]);

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
  const [isVisibleReference, setIsVisibleReference] = useState(false);

  // Función para alternar la visibilidad del componente
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const toggleVisibilityMachine = () => {
    setIsVisibleMachine(!isVisibleMachine);
  };
  const toggleVisibilityReference = () => {
    setIsVisibleReference(!isVisibleReference);
  };

  const [capacity, setCapacity]= useState(0)


  // Metodo para eliminar una asignacion
  const fetchAssignations = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/allassign');
      const data = await response.json();
      setAllAssignament(data);
    } catch (error) {
      console.error('Error fetching assignations:', error);
    }
  };
  // Efecto para cargar las asignaciones al montar el componente
  useEffect(() => {
    fetchAssignations();
  }, []);
const handleDeleteAssignation = async () => {
 await console.log('Fetching assignments');
}

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
          referencesData,
          setReferencesData,
          isVisibleReference,
          setIsVisibleReference,
          toggleVisibilityReference,
          assignamentData,
          setAssignament,
          capacity,
          setCapacity,
          allassignamentData,
          setAllAssignament,
          handleDeleteAssignation,
          registerData,
          setRegisterData,
          pruebaData,
          setPruebaData,
          rutaLocal,
           }}>
          {children}
        </GlobalContext.Provider>
      );
};

export default UserContext;
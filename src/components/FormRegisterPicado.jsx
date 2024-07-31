import { useGlobalContext } from "../context/UserContext";

export default function FormRegisterPicado() {
  const{allassignamentData}=useGlobalContext();
  console.log(allassignamentData);
  return (
    <div>FormRegisterPicado</div>
  )
}

import { useGlobalContext } from "../context/UserContext"

export default function MenuAdmin() {
    const {isVisible ,toggleVisibility}=useGlobalContext();
    return (
        <>
            <div className="flex flex-wrap justify-center">
                <button className="btn join-item m-2" onClick={toggleVisibility}>{isVisible ? 'Ocultar fromulario' : 'Registrar Usuario'}</button>
                <button className="btn join-item m-2">Registrar maquinas</button>
                <button className="btn join-item m-2">Registrar referencias</button>
            </div>
        </>
    )
}

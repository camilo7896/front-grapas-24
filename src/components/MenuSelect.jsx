import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/UserContext";

export default function MenuSelect() {
    const { usersData, data,referencesData } = useGlobalContext();

    const numberUsers= usersData.length;
    const numberMachines=data.length;
    const numberReferences=referencesData.length;


    return (
        <ul className="menu bg-base-100 flex justify-center">
            <li>
                <Link to={'/userlist'}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5.121 17.804A4 4 0 016 18h12a4 4 0 010 8H6a4 4 0 01-.879-7.196zM12 14a5 5 0 100-10 5 5 0 000 10z" />
                    </svg>
                    Usuarios
                    <span className="badge badge-sm">{numberUsers}</span>
                </Link>
            </li>
            <li>
                <a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M10.325 4.317a1.724 1.724 0 013.35 0 2.733 2.733 0 01.563 0l1.967-1.013a1.723 1.723 0 011.837.684l1.308 1.963a2.733 2.733 0 01.26.73l1.103.426a1.724 1.724 0 01.837 1.837l-1.013 1.967a2.733 2.733 0 010 .563l1.013 1.967a1.724 1.724 0 01-.684 1.837l-1.963 1.308a2.733 2.733 0 01-.73.26l-.426 1.103a1.724 1.724 0 01-1.837.837l-1.967-1.013a2.733 2.733 0 01-.563 0l-1.967 1.013a1.724 1.724 0 01-1.837-.684l-1.308-1.963a2.733 2.733 0 01-.26-.73l-1.103-.426a1.724 1.724 0 01-.837-1.837l1.013-1.967a2.733 2.733 0 010-.563l-1.013-1.967a1.724 1.724 0 01.684-1.837l1.963-1.308a2.733 2.733 0 01.73-.26l.426-1.103a1.724 1.724 0 011.837-.837l1.967 1.013a2.733 2.733 0 01.563 0zm1.675 7.683a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>

                    Maquinas
                    <span className="badge badge-sm">{numberMachines}</span>
                </a>
            </li>
            <li>
                <a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M2 19.5A2.5 2.5 0 014.5 17H20M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM16 4v16" />
                    </svg>
                    Referencias
                    <span className="badge badge-sm">{numberReferences}</span>
                </a>
            </li>
        </ul>
    )
}

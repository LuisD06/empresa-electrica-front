import { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthProvider';

const Menu = (props) => {
    const { userContext } = useContext(AuthContext);
    return (
        <>
            <div className="navigation">
                <div className="brand">
                    <img src="https://seeklogo.com/images/E/empresa-electrica-quito-s-a-logo-F883FDF254-seeklogo.com.png" alt="brand" className='brand__img'/>
                </div>
                <ul>
                    {
                        userContext.tipo === 'operador' ?
                            <>
                                <li className="nav-item">
                                    <Link to="/user/reports" className="nav-link">Reportes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/user/register-medidor" className="nav-link">Registrar Medidor</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/user/register-user" className="nav-link">Registrar Usuario</Link>
                                </li>
                            </> :
                            <li className="nav-item">
                                <Link to="/user/dashboard" className="nav-link">Resumen</Link>
                            </li>
                    }
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Salir</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Menu;
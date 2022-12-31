import { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthProvider';

const Menu = (props) => {
    const { userContext } = useContext(AuthContext);
    return (
        <>
            <div className="navigation">
                <div className="brand">
                    <p>brand</p>
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
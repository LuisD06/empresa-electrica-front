import { Link } from "react-router-dom";

const Menu = (props) => {
    return (
        <>
            <div className="navigation">
                <div className="brand">
                    <p>brand</p>
                </div>
                <ul>
                    <li className="nav-item">
                        <Link to="/user/dashboard" className="nav-link">Resumen</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user/reports" className="nav-link">Reportes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Salir</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Menu;
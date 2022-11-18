import { Link } from 'react-router-dom';
import './DashboardStyle.css';
export const Dashboard = () => {
    return(
        <>
            <div className="dashboard">
                <div className="navigation">
                    <div className="brand">
                        <p>brand</p>
                    </div>
                    <ul>
                        <li className="nav-item"><a href="">Informacion</a></li>
                        <li className="nav-item"><a href="">Reportes</a></li>
                    </ul>
                </div>
                <div className="content">
                    <div className="user-bar">
                        {/* <a className='user-button' href="">J</a> */}
                        <Link className='user-button' to="/login">J</Link>
                    </div>
                    <div className="main-content">
                        <div className="meter-container info-container">
                            <h2>Consumo Eléctrico</h2>
                            <p>30p</p>
                        </div>
                        <div className="data-container info-container">
                            <h3>Información del cliente</h3>
                            <div className="client-info-container">
                                <div className="client-info-group">
                                    <h4>Nombre</h4>
                                    <p>XXXX XXX XXXX XXX</p>
                                </div>
                                <div className="client-info-group">
                                    <h4>Dirección</h4>
                                    <p>XXXXXXXXXXX XXXXX XXXXXX</p>
                                </div>
                                <div className="client-info-group">
                                    <h4>Teléfono</h4>
                                    <p>XXXXXXXXXX</p>
                                </div>
                                <div className="client-info-group">
                                    <h4>Correo</h4>
                                    <p>xxxxx@xxxxx.xxxx</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { ChartVoltaje } from './charts/ChartVoltaje';
import { GraphicVoltaje } from './charts/GraphicVoltaje';
import './DashboardStyle.css';
export const Dashboard = () => {
    const [medidor, setMedidor] = useState({});
    const [data, setData] = useState([]);
    const [connectedWS, setConnectedWS] = useState(false);
    const { userContext } = useContext(AuthContext);
    const websocket = useRef(null);
    const handleViewChart = () => {
        axios({
            method: "get",
            url: "http://localhost:4000/api/medidor",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            const dateLabelList = res.data.map(item => ({
                date: item.data.date,
                voltaje: item.data.voltaje
            }));
            console.log(dateLabelList);
            setData(dateLabelList);
        })
    }
    
    useEffect(
        () => {
            websocket.current = new WebSocket("ws://localhost:4000");
            websocket.current.onopen = () => console.log();
            websocket.current.onmessage = (event) => console.log(setMedidor(JSON.parse(event.data)));
            websocket.current.onclose = (event) => console.log("ws closed"+event.data);
            const wsCurrent = websocket.current;
            return () => {
                wsCurrent.close();
            };
        },
        []
    );
    useEffect(
        () => {
            console.log(connectedWS);
        },
        [connectedWS]
    );
    return (
        <>
            <div className="dashboard">
                <div className="content">
                    <div className="main-content">
                        <div className='info-section'>
                            <h2>Tiempo real</h2>
                            <div className='info-container graph-container'>
                                <GraphicVoltaje value={medidor.Corriente} title={"Corriente"} />
                                <GraphicVoltaje value={medidor.Energia} title={"Energía"} />
                                <GraphicVoltaje value={medidor.Power} title={"Power"} />
                                <GraphicVoltaje value={medidor.Temperatura} title={"Temperatura"} />
                                <GraphicVoltaje value={medidor.Voltaje} title={"Voltaje"} />
                            </div>
                        </div>
                        <div className="info-container">
                            <h3>Información del cliente</h3>
                            <div className="client-info-container">
                                <div className="client-info-group">
                                    <h4>Nombre</h4>
                                    <p>{userContext.nombre}</p>
                                </div>
                                <div className="client-info-group">
                                    <h4>Dirección</h4>
                                    <p>{userContext.direccion}</p>
                                </div>
                                <div className="client-info-group">
                                    <h4>Teléfono</h4>
                                    <p>{userContext.telefono}</p>
                                </div>
                                <div className="client-info-group">
                                    <h4>Correo</h4>
                                    <p>{userContext.correo}</p>
                                </div>

                            </div>
                        </div>
                        <div className="chart-container">
                            <button onClick={() => handleViewChart()}>Ver datos de voltaje</button>
                            <ChartVoltaje
                                datasets={data.map(medidorItem => medidorItem.voltaje)}
                                labels={data.map(medidoritem => medidoritem.date)}
                            />

                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}
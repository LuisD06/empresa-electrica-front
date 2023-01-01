import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { getMedicion } from '../../services/medicion-service/medicion-service';
import { Input } from '../atoms/input/input';
import { Map } from '../organisms/map/map';
import { ChartVoltaje } from './charts/ChartVoltaje';
import { GraphicVoltaje } from './charts/GraphicVoltaje';
import './DashboardStyle.scss';
export const Dashboard = () => {
    const [medidor, setMedidor] = useState({});
    const [data, setData] = useState([]);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const { userContext } = useContext(AuthContext);
    const websocket = useRef(null);
    const handleViewChart = (evt, type) => {
        if (type === 'day') {
            setDay(evt);
            setMonth("");
        }
        if (type === 'month') {
            setMonth(evt);
            setDay("");
        }
        const data = {
            date: evt
        }
        console.log(data);
        
        getMedicion(type, data).then((res) => {
            console.log(res);
            const dateLabelList = res.map(item => ({
                date: item.data.date,
                voltaje: item.data.voltaje,
                energia: item.data.energia,
                corriente: item.data.corriente
            }));
            console.log(dateLabelList);
            setData(dateLabelList);
        })
    }

    useEffect(
        () => {
            websocket.current = new WebSocket("ws://localhost:4001");
            websocket.current.onopen = () => console.log();
            websocket.current.onmessage = (event) => setMedidor(JSON.parse(event.data));
            websocket.current.onclose = (event) => console.log("ws closed" + event.data);
            const wsCurrent = websocket.current;
            return () => {
                wsCurrent.close();
            };
        },
        []
    );
    return (
        <>
            <div className="dashboard">
                <div className="content">
                    <div className="main-content">
                        <div className="info-section">
                            <h2>Información del cliente</h2>
                            <div className="info-container">
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
                                <div className="client-info-group">
                                    <h4># Medidor</h4>
                                    <p>{userContext.medidor.numero}</p>
                                </div>
                            </div>

                        </div>
                        <div className='info-section'>
                            <h2>Tiempo real</h2>
                            <div className='info-container graph-container'>
                                <GraphicVoltaje value={medidor.Corriente} title={"Corriente"} />
                                <GraphicVoltaje value={medidor.Energia} title={"Energía"} />
                                <GraphicVoltaje value={medidor.Power} title={"Power"} />
                                <GraphicVoltaje value={medidor.Temperatura} title={"Temperatura"} />
                                <GraphicVoltaje value={medidor.Voltaje} title={"Voltaje"} />
                                <GraphicVoltaje value={medidor.Suma} title={"Consumo"} />
                            </div>
                        </div>
                        <div className='map-section'>
                            <Map position={[userContext.medidor.lat, userContext.medidor.lng]}/>
                        </div>
                        
                        <div className="chart-container">
                            <h3>Historial de energía</h3>
                            <div className='dashboard__month-input-wrapper'>
                                <Input type="month" value={month} onChange={(evt) => handleViewChart(evt, 'month')} />
                            </div>
                            <ChartVoltaje
                                datasets={[
                                    {
                                        label: 'J',
                                        data: data.map(medidorItem => medidorItem.energia),
                                        borderColor: 'rgb(94, 230, 216)',
                                        backgroundColor: 'rgba(94, 230, 216, 0.5)'
                                    },
                                ]}
                                labels={data.map(medidoritem => {
                                    const date = new Date(medidoritem.date).getDate();
                                    return date;
                                })}
                                title={`Energía ${month}`}
                            />
                        </div>
                        
                    </div>
                </div>
            </div>
                

        </>
    );
}
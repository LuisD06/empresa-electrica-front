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
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const { userContext } = useContext(AuthContext);
    const websocket = useRef(null);
    const handleViewChart = (evt, type) => {
        if (type === 'day') {
            setDay(evt.target.value);
            setMonth("");
        }
        if (type === 'month') {
            setMonth(evt.target.value);
            setDay("");
        }
        const data = {
            date: evt.target.value
        }
        console.log(data);

        axios({
            method: "post",
            url: `http://localhost:4000/api/medidor/${type}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data
        }).then((res) => {
            console.log(res);
            const dateLabelList = res.data.map(item => ({
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
            websocket.current = new WebSocket("ws://localhost:4000");
            websocket.current.onopen = () => console.log();
            websocket.current.onmessage = (event) => console.log(setMedidor(JSON.parse(event.data)));
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
                            </div>
                        </div>
                        <div className="chart-container">
                            <input type="date" onChange={(evt) => handleViewChart(evt, 'day')} value={day}></input>
                            <input type="month" onChange={(evt) => handleViewChart(evt, 'month')} value={month}></input>
                            <ChartVoltaje
                                datasets={[{
                                    label: 'Volts',
                                    data: data.map(medidorItem => medidorItem.voltaje),
                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                                }]}
                                labels={data.map(medidoritem => {
                                    const date = new Date(medidoritem.date).getHours();
                                    return date + "h";
                                })}
                                title={`Voltaje ${day}`}
                            />
                        </div>
                        <div className="chart-container">
                            <ChartVoltaje
                                datasets={[
                                    {
                                        label: 'J',
                                        data: data.map(medidorItem => medidorItem.energia),
                                        borderColor: 'rgb(94, 230, 216)',
                                        backgroundColor: 'rgba(94, 230, 216, 0.5)'
                                    },
                                    {
                                        label: 'A',
                                        data: data.map(medidorItem => medidorItem.corriente),
                                        borderColor: 'rgb(87, 242, 139)',
                                        backgroundColor: 'rgba(87, 242, 139, 0.5)'
                                    },
                                ]}
                                labels={data.map(medidoritem => {
                                    const date = new Date(medidoritem.date).getDate();
                                    return date;
                                })}
                                title={`Energía, Corriente ${month}`}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
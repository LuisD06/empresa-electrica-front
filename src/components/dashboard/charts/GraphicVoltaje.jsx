import { useEffect, useState } from "react";

export const GraphicVoltaje = ({value, title, units = ''}) =>{
    const [voltaje, setVoltaje] = useState(value);
    useEffect(
        () => setVoltaje(value),
        [value]
    );
    return (
        <div className="graph">
            <h3>{title}</h3>
            <p>{voltaje} {units}</p>
        </div>
    );
}
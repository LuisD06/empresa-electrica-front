import { useState } from 'react'
import { getMedidorListBySuministro } from '../../../../services/medidor-service/medidor-service';

export const useGetMedidor = () => {
  const [medidorList, setMedidorList] = useState([]);
  const [validList, setValidList] = useState(false);
  const getValue = (suministro) => {
    getMedidorListBySuministro(suministro).then((value) => {
      console.log('medidores',value);
      const resList = value.data.map((medidor) => {
        return {
          value: medidor.data.id,
          text: `${medidor.data.numero} - ${medidor.data.servicio} - ${medidor.data.tipo}`
        }
      })
      setMedidorList(resList);
      setValidList(true);
    }).catch((err) => {
      console.log(err);
      setValidList(false);
    });
  }
  const resetList = () => {
    setMedidorList([]);
  }
  return {
    medidorList,
    getValue,
    validList,
    resetList
  }
}

import { useEffect, useState } from 'react';
import { getMedidorList } from '../../../../services/medidor-service/medidor-service';

const useGetMedidorList = () => {
  const [medidorList, setMedidorList] = useState([]);
  useEffect(
    () => {
      getMedidorList().then((data) => {
        setMedidorList(data);
      })
    },
    []
  )
  return {
    medidorList
  }
}
export default useGetMedidorList;
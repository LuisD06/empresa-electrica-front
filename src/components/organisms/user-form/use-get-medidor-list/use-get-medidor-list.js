import { useEffect, useState } from 'react';
import { getMedidorList } from '../../../../services/medidor-service/medidor-service';

const useGetMedidorList = () => {
  const [medidorList, setMedidorList] = useState([]);
  const onGetData = () => {
    getMedidorList().then((data) => {
      setMedidorList(data);
    })
  }
  useEffect(
    () => {
      onGetData();
    },
    []
  )
  return {
    medidorList,
    onGetData
  }
}
export default useGetMedidorList;
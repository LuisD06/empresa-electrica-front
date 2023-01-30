import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider';
import { getInstancesByClient } from '../../../services/medidor-service/medidor-service';

export const useGetInstances = () => {
  const { userContext } = useContext(AuthContext);
  const [instances, setInstances] = useState([]);
  const getData = (usuario) => {
    getInstancesByClient(usuario).then((value) => {
      console.log(value);
      setInstances(value.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(
    () => {
      getData(userContext.id)
    },
    []
  )

  
  return {
    instances,
  }
}

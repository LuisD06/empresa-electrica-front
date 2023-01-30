import { useState } from 'react'
import { getByCedula } from '../../../../services/user-service/user-service';

export const useGetClient = () => {
  const [cedula, setCedula] = useState('');
  const [client, setClient] = useState(null);
  const [success, setSuccess] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Message');
  const onCedulaChange = (value) => {
    if (value.length === 0) {
      setSuccess(true);
    }
    setCedula(value);
  }
  const getClientData = () => {
    getByCedula(cedula).then((value) => {
      console.log(value.data);
      setClient(value.data);
      setSuccess(true);      
    }).catch((err) => {
      setSuccess(false);
      setClient(null);
      setStatusMessage(err.response.data.message);
    });
  }
  return {
    client,
    getClientData,
    onCedulaChange,
    cedula,
    success,
    setSuccess,
    statusMessage
  }
}

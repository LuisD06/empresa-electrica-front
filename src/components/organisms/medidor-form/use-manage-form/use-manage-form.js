import { useState } from 'react';
import { createMedidor } from '../../../../services/medidor-service/medidor-service';

const useManageForm = () => {
  const [form, setForm] = useState({
    numero: '',
    tipo: '',
    servicio: '',
    suministro: '',
    lat: '0',
    lng: '0'
  });
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Status');
  const handleResetForm = () => {
    setForm({
      numero: '',
      tipo: '',
      servicio: '',
      suministro: '',
      lat: '0',
      lng: '0'
    })
  }
  const handleChangeValue = (key, value) => {
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(form);
    createMedidor(form).then((value) => {
      setStatusMessage('Operación existosa!')
      setSuccess(true);
      handleResetForm();
    }).catch((error) => {
      setStatusMessage('Ha ocurrido un error!')
      setSuccess(true);
    });
  }
  return {
    statusMessage,
    success,
    form,
    handleChangeValue,
    handleSubmit,
    setSuccess
  }
}
export default useManageForm;
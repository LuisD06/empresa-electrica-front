import { useState } from 'react';
import { registerUser, registerOperator } from '../../../../services/user-service/user-service';
const useUserForm = () => {
  const [form, setForm] = useState({
    cedula: '',
    clave: '',
    correo: '',
    direccion: '',
    nombre: '',
    telefono: '',
    tipo: '',
    medidorId: ''
  });
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Status');
  const handleResetForm = () => {
    setForm({
      cedula: '',
      clave: '',
      correo: '',
      direccion: '',
      nombre: '',
      telefono: '',
      tipo: '',
      medidorId: ''
    })
  }
  const handleChangeValue = (key, value) => {
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (form.tipo === 'cliente') {
      registerUser(form).then((value) => {
        setStatusMessage('Operación existosa!!');
        setSuccess(true);
        handleResetForm();
      }).catch((error) => {
        setStatusMessage('Ha ocurrido un error');
        setSuccess(true);
      });
    }
    if (form.tipo === 'operador') {
      registerOperator(form).then((value) => {
        setStatusMessage('Operación existosa!!');
        setSuccess(true);
        handleResetForm();
      }).catch((error) => {
        setStatusMessage('Ha ocurrido un error');
        setSuccess(true);
      });
    }
  }
  return {
    success,
    statusMessage,
    setSuccess,
    form,
    handleChangeValue,
    handleSubmit
  }
}
export default useUserForm;
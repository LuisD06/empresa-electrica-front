import { useEffect, useState } from 'react';
import { registerUser, registerOperator, validateUser } from '../../../../services/user-service/user-service';
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
  const [valid, setValid] = useState(true);
  const [hasError, setHasError] = useState(false);
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
  const validateData = (cedula) => {
    validateUser(cedula).then((value) => {
      if (value.message) {
        setValid(true);
      } else {
        setValid(false);
      }
    });
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (form.direccion !== '') {
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
    } else {
      setStatusMessage('Dirección no válida');
      setSuccess(true);
    }
  }
  useEffect(
    () => {
      if (form.cedula.length === 10) {
        validateData(form.cedula);
      }
    },
    [form.cedula]
  )
  return {
    success,
    statusMessage,
    setSuccess,
    form,
    handleChangeValue,
    handleSubmit,
    valid
  }
}
export default useUserForm;
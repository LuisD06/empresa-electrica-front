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
  const handleChangeValue = (key, value) => {
    setForm((currentForm) => ({...currentForm, [key]:value}));
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (form.tipo === 'cliente') {
      registerUser(form).then((value) => {
        console.log(value);
      }).catch((error) => {
        console.log(error);
      });
    }
    if (form.tipo === 'operador') {
      registerOperator(form).then((value) => {
        console.log(value);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  return {
    form,
    handleChangeValue,
    handleSubmit
  }
}
export default useUserForm;
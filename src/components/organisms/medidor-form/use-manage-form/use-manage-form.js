import { useState } from 'react';
import { createMedidor } from '../../../../services/medidor-service/medidor-service';

const useManageForm = () => {
  const [form, setForm] = useState({});
  const handleChangeValue = (key, value) => {
    setForm((currentForm) => ({...currentForm, [key]:value}));
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(form);
    createMedidor(form).then((value) => {
      console.log(value);
    }).catch((error) => {
      console.log(error);
    });
  }
  return {
    form,
    handleChangeValue,
    handleSubmit
  }
}
export default useManageForm;
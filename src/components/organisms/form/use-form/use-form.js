import { useState } from 'react'
import { addMedidor } from '../../../../services/user-service/user-service';

export const useForm = ({ initialForm }) => {
  const [form, setForm] = useState(initialForm);
  const [success, setSucess] = useState(false);
  const onValueChange = (field, value) => {
    setForm((currentForm) => {
      return ({...currentForm, [field]:value});
    })
  }
  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(form);
    addMedidor(form).then((value) => {
      console.log(value);
    }).catch((err) => {
      console.log(err);
    });
  }
  return {
    ...form,
    onValueChange,
    onSubmit
  }
}

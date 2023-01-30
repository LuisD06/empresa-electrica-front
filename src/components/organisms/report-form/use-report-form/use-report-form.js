import { useState } from 'react'
import { createReportByMedidor } from '../../../../services/report-service/report-service'

const useReportForm = () => {
  const [form, setForm] = useState({
    numero: '',
    date: ''
  })
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Status');
  const handleChangeValue = (key, value) => {
    setForm((currentForm) => {
      return ({...currentForm, [key]:value});
    })
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    createReportByMedidor(form).then((data) => {
      setStatusMessage('Operacion realizada con éxito !');
      setSuccess(true);
    }).catch((error) => {
      const errorMessage = error.response.data.message;
      setStatusMessage('Ha ocurrido un error: '+errorMessage);
      setSuccess(true);
    })
  }
  return {
    form,
    handleChangeValue,
    handleSubmit,
    success,
    setSuccess,
    statusMessage
  }
}

export default useReportForm;
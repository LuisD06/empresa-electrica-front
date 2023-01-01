import { useState } from 'react'
import { createReport } from '../../../../services/report-service/report-service'

const useReportForm = () => {
  const [form, setForm] = useState({
    id: '',
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
    createReport(form).then((data) => {
      setStatusMessage('Operacion realizada con éxito !');
      setSuccess(true);
    }).catch((error) => {
      setStatusMessage('Ha ocurrido un error');
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
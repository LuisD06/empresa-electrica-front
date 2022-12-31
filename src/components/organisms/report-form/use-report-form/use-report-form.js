import { useState } from 'react'
import { createReport } from '../../../../services/report-service/report-service'

const useReportForm = () => {
  const [form, setForm] = useState({
    id: '',
    date: ''
  })
  const handleChangeValue = (key, value) => {
    setForm((currentForm) => {
      return ({...currentForm, [key]:value});
    })
  }
  const handleSubmit = () => {
    createReport(form).then((data) => {
      console.log(data)
    }).catch((error) => {
      console.log(error);
    })
  }
  return {
    form,
    handleChangeValue,
    handleSubmit
  }
}

export default useReportForm;
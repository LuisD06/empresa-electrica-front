import { Button } from '../../atoms/button/button'
import { Alert } from '../../molecules/alert/alert'
import { InputGroup } from '../../molecules/input-group/input-group'
import './report-form.scss'
import useReportForm from './use-report-form/use-report-form'
export const ReportForm = () => {
  const { form, handleChangeValue, handleSubmit, success, setSuccess, statusMessage } = useReportForm();
  return (
    <div className='report-form'>
      <h3 className='report-form__title'>Generar Reporte</h3>
      <form onSubmit={(evt) => handleSubmit(evt)} className='report-form__form-wrapper'>
        <div className='repor-form__user-wrapper'>
          <InputGroup label="Cédula" value={form.id} onChange={(value) => handleChangeValue('id', value)} required/>
        </div>
        <div className='report-form__date-wrapper'>
          <InputGroup type='month' label='Fecha' value={form.date} onChange={(value) => handleChangeValue('date', value)} required/>
          <div className="report-form__button">
            <Button>
              Generar Reporte
            </Button>
          </div>
        </div>
      </form>
      {
        success && 
        <div className='report-form__alert-wrapper'>
          <Alert title={statusMessage} onClick={() => setSuccess(false)}/>            
        </div>
      }
    </div>
  )
}
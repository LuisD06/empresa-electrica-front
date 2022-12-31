import { Button } from '../../atoms/button/button'
import { InputGroup } from '../../molecules/input-group/input-group'
import './report-form.scss'
import useReportForm from './use-report-form/use-report-form'
export const ReportForm = () => {
  const { form, handleChangeValue, handleSubmit } = useReportForm();
  return (
    <div className='report-form'>
      <h3 className='report-form__title'>Generar Reporte</h3>
      <div className='repor-form__user-wrapper'>
        <InputGroup label="Cédula" value={form.id} onChange={(value) => handleChangeValue('id', value)} />
        <div className="report-form__button">
          <Button>
            Buscar
          </Button>
        </div>
      </div>
      <div className='report-form__date-wrapper'>
        <InputGroup type='month' label='Fecha' value={form.date} onChange={(value) => handleChangeValue('date', value)}/>
        <div className="report-form__button">
          <Button onClick={handleSubmit}>
            Generar Reporte
          </Button>
        </div>
      </div>
    </div>
  )
}
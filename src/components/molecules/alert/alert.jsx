import { Button } from '../../atoms/button/button'
import './alert.scss'
export const Alert = ({ title = 'Alert', onClick }) => {
  return (
    <div className='alert'>
      <h4 className='alert__title'>{title}</h4>
      <div className='alert__button-wrapper'>
        <Button onClick={onClick}>
          Aceptar
        </Button>
      </div>
    </div>
  )
}
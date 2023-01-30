import { useEffect } from 'react'
import { Button } from '../../atoms/button/button'
import { Alert } from '../../molecules/alert/alert'
import { InputGroup } from '../../molecules/input-group/input-group'
import { SelectGroup } from '../../molecules/select-group/select-group'
import { Map } from '../map/map'
import './form.scss'
import { useForm } from './use-form/use-form'
import { useGetClient } from './use-get-client/use-get-client'
import { useGetMedidor } from './use-get-medidor/use-get-medidor'

export const Form = () => {
  const { client, getClientData, cedula, onCedulaChange, success, statusMessage, setSuccess, } = useGetClient();
  const { getValue, medidorList, validList, resetList } = useGetMedidor();
  const { onValueChange, direccion, onSubmit, medidor } = useForm({
    direccion: '',
    usuario: '',
    medidor: ''
  })
  useEffect(
    () => {
      if (client !== null) {
        getValue(client.medidores[0].data.suministro);
        onValueChange('usuario', client.usuario.data.id);
      } else {
        resetList();
      }
    },
    [client]
  )
  return (
    <div className='form'>
      <form className='form__wrapper' onSubmit={(evt) => onSubmit(evt)}>
        <h3 className='form__title'>Agregar medidor a cliente</h3>
        <div className='form__input-group'>
          <InputGroup placeholder="Cédula" onChange={(value) => onCedulaChange(value)} value={cedula} />
          <div className='form__input-button'>
            <Button onClick={() => getClientData()}>
              Buscar
            </Button>
          </div>
        </div>
        <div className='form__map-wrapper'>
          <Map position={[-0.1892741496883334, -78.4977070330735]} search={true} onClick={(value) => onValueChange('direccion', `${value.lat},${value.lng}`)} />
        </div>
        <InputGroup label='Dirección' disabled required value={direccion} />
        <SelectGroup
          label={`Medidores del suministro: ${client ? client.medidores[0].data.suministro : ''} disponibles`}
          options={medidorList}
          onChange={(value) => onValueChange('medidor', value)}
          value={medidor}
        />
        <div className='form__button-wrapper'>
          <Button type='submit'>
            Aceptar
          </Button>
        </div>
      </form>
      <div className='form__info-wrapper'>
        <div className='form__info'>
          <h3 className='form__info-title'>
            Nombre
          </h3>
          <span className='form__info-text'>
            {client &&
              client.usuario.data.nombre
            }
          </span>
        </div>
        <div className='form__info'>
          <h3 className='form__info-title'>
            Suministro
          </h3>
          <span className='form__info-text'>
            {
              client &&
              client.medidores[0].data.suministro
            }
          </span>
        </div>
        <div className='form__info'>
          <h3 className='form__info-title'>
            Medidores
          </h3>
          {
            client &&
            client.medidores.map((medidor) => {
              return <span key={medidor.data.id} className='form__info-text'>{medidor.data.numero}</span>
            })
          }
        </div>
      </div>
      {
        !success &&
        <div className='form__alert-wrapper'>
          <Alert title={statusMessage} onClick={() => setSuccess(true)} />
        </div>
      }

    </div>
  )
}

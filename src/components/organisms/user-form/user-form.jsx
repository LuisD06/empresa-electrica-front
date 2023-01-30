import { useEffect } from 'react';
import { Button } from '../../atoms/button/button';
import { Alert } from '../../molecules/alert/alert';
import { InputGroup } from '../../molecules/input-group/input-group';
import { SelectGroup } from '../../molecules/select-group/select-group';
import { Map } from '../map/map';
import useGetMedidorList from './use-get-medidor-list/use-get-medidor-list';
import useUserForm from './use-user-form/use-user-form';
import './user-form.scss'
export const UserForm = () => {
  const { form, handleChangeValue, handleSubmit, statusMessage, success, setSuccess, valid, hasError } = useUserForm();
  const { medidorList, onGetData } = useGetMedidorList();
  useEffect(
    () => {
      onGetData();
    },
    [success]
  )
  return (
    <div className='user-form'>
      <form className='user-form__form-wrapper' onSubmit={handleSubmit}>
        <h3 className='user-form__title'>Nuevo Usuario</h3>
        <InputGroup label='Cédula' onChange={(value) => handleChangeValue('cedula', value)} value={form.cedula} required valid={valid} errorMessage={"Ya existe un usuario con esta cédula"}/>
        <InputGroup label='Nombre' onChange={(value) => handleChangeValue('nombre', value)} value={form.nombre} required/>
        <InputGroup label='Dirección' onChange={(value) => handleChangeValue('direccion', value)} value={form.direccion} required disabled/>
        <InputGroup label='Correo' onChange={(value) => handleChangeValue('correo', value)} value={form.correo} required/>
        <InputGroup label='Teléfono' onChange={(value) => handleChangeValue('telefono', value)} value={form.telefono} required/>
        <SelectGroup label='Tipo' options={[
          { value: 'cliente', text: 'Cliente' },
          { value: 'operador', text: 'Operador' },
        ]}
          onChange={(value) => handleChangeValue('tipo', value)} value={form.tipo}
        />
        <InputGroup label='Contraseña' onChange={(value) => handleChangeValue('clave', value)} value={form.clave} required/>
        {
          form.tipo === 'cliente' &&
          <SelectGroup 
            label='Medidor'
            options={
              medidorList ? medidorList.map((medidor) => {
                return ({ value: medidor.id, text: `${medidor.numero} - ${medidor.servicio} - ${medidor.tipo}` })
              }) : []
            }
            onChange={(value) => handleChangeValue('medidorId', value)} value={form.medidorId}
          />
        }
        <div className='user-form__button-wrapper'>
          <Button disabled={!valid && form.tipo === 'operador'} type="submit">
            Aceptar
          </Button>
        </div>
      </form>
      <div className='user-form__map-wrapper'>
        <Map position={[-0.1892741496883334, -78.4977070330735]} search={true} onClick={(value) => handleChangeValue('direccion',`${value.lat},${value.lng}`)}/>
      </div>
      {
        success && 
        <div className='user-form__alert-wrapper'>
          <Alert title={statusMessage} onClick={() => setSuccess(false)}/>
        </div>
      }
    </div>
  );
}
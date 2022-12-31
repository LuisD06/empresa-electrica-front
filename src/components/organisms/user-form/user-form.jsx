import { Button } from '../../atoms/button/button';
import { InputGroup } from '../../molecules/input-group/input-group';
import { SelectGroup } from '../../molecules/select-group/select-group';
import { Map } from '../map/map';
import useGetMedidorList from './use-get-medidor-list/use-get-medidor-list';
import useUserForm from './use-user-form/use-user-form';
import './user-form.scss'
export const UserForm = () => {
  const { form, handleChangeValue, handleSubmit } = useUserForm();
  const { medidorList } = useGetMedidorList();
  return (
    <div className='user-form'>
      <form className='user-form__form-wrapper' onSubmit={handleSubmit}>
        <h3 className='user-form__title'>Nuevo Usuario</h3>
        <InputGroup label='Cédula' onChange={(value) => handleChangeValue('cedula', value)} value={form.cedula} />
        <InputGroup label='Nombre' onChange={(value) => handleChangeValue('nombre', value)} value={form.nombre} />
        <InputGroup label='Dirección' onChange={(value) => handleChangeValue('direccion', value)} value={form.direccion} />
        <InputGroup label='Correo' onChange={(value) => handleChangeValue('correo', value)} value={form.correo} />
        <InputGroup label='Teléfono' onChange={(value) => handleChangeValue('telefono', value)} value={form.telefono} />
        <SelectGroup label='Tipo' options={[
          { value: 'cliente', text: 'Cliente' },
          { value: 'operador', text: 'Operador' },
        ]}
          onChange={(value) => handleChangeValue('tipo', value)} value={form.tipo}
        />
        <InputGroup label='Contraseña' onChange={(value) => handleChangeValue('clave', value)} value={form.clave} />
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
        <Button>
          Aceptar
        </Button>
      </form>
      <div className='user-form__map-wrapper'>
        <Map search={true} onClick={(value) => handleChangeValue('direccion',`${value.lat},${value.lng}`)}/>
      </div>
    </div>
  );
}
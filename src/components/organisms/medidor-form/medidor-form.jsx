import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import { Select } from '../../atoms/select/select';
import { InputGroup } from '../../molecules/input-group/input-group';
import { SelectGroup } from '../../molecules/select-group/select-group';
import './medidor-form.scss';
import useManageForm from './use-manage-form/use-manage-form';
export const MedidorForm = () => {
  const { form, handleChangeValue, handleSubmit } = useManageForm();
  return (
    <div className='medidor-form'>
      <h3 className='medidor-form__title'>Nuevo medidor</h3>
      <form className='medidor-form__form-wrapper' onSubmit={handleSubmit}>
        <InputGroup
          type='number'
          label='Número de medidor'
          onChange={(value) => handleChangeValue('numero', value)}
        />
        <SelectGroup
          onChange={(value) => handleChangeValue('tipo', value)}
          label='Tipo de medidor'
          options={[
            { value: 'ab', text: 'ab' },
            { value: 'am', text: 'am' }
          ]}
          value={form.tipo}
        />
        <SelectGroup
          onChange={(value) => handleChangeValue('servicio', value)}
          label='Tipo de servicio'
          options={[
            { value: 'residencial', text: 'Residencial' },
            { value: 'comercial', text: 'Comercial' },
            { value: 'industrial', text: 'Industrial' },
            { value: 'comunitario', text: 'Comunitario' },
          ]}
          value={form.servicio}
        />
        <InputGroup 
          label='Número de suministro' 
          onChange={(value) => handleChangeValue('suministro', value)}
        />
        <InputGroup 
          label='Latitud'
          onChange={(value) => handleChangeValue('lat', value)}
        />
        <InputGroup 
          label='Longitud' 
          onChange={(value) => handleChangeValue('lng', value)}
        />
        <Button>
          Guardar
        </Button>
      </form>
    </div>

  );
}
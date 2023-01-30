import { Input } from '../../atoms/input/input';
import './input-group.scss';
export const InputGroup = ({ 
    label, 
    placeholder, 
    type, 
    value, 
    onChange, 
    required = false,
    disabled = false, 
    valid = false,
    errorMessage = ''
  }) => {
  return (
    <div className='input-group'>
      <span className='input-group__label'>{label}</span>
      <Input 
        placeholder={placeholder} 
        type={type} 
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      {
        !valid && <span>{errorMessage}</span>
      }
    </div>
  );
}
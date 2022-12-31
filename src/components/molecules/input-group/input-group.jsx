import { Input } from '../../atoms/input/input';
import './input-group.scss';
export const InputGroup = ({ label, placeholder, type, value, onChange }) => {
  return (
    <div className='input-group'>
      <span className='input-group__label'>{label}</span>
      <Input 
        placeholder={placeholder} 
        type={type} 
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
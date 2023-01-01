import './input.scss';
export const Input = ({ 
    placeholder, 
    type, 
    value, 
    onChange, 
    required = false,
    disabled = false,
  }) => {
  return (
    <input 
      className='input' 
      placeholder={placeholder} 
      type={type} 
      onChange={(evt) => onChange(evt.target.value)} 
      value={value}
      required={required}
      disabled={disabled}
    />
  );
}
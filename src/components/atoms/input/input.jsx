import './input.scss';
export const Input = ({ placeholder, type, value, onChange }) => {
  return (
    <input 
      className='input' 
      placeholder={placeholder} 
      type={type} 
      onChange={(evt) => onChange(evt.target.value)} 
      value={value}
    />
  );
}
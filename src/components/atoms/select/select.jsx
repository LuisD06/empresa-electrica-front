import './select.scss';
export const Select = ({options, onChange, value}) => {
  return (
    <select className='select'  onChange={(evt) => onChange(evt.target.value)} value={value}>
      <option value=''>Seleccionar</option>
      {
        options.map((option) => {
          return <option key={Math.random() * 16} value={option.value}>{option.text}</option>
        })
      }
    </select>
  );
}
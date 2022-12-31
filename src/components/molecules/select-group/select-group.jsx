import { Select } from '../../atoms/select/select';

export const SelectGroup = ({ label, options, onChange, value }) => {
  return (
    <div className='select-group'>
      <span>{label}</span>
      <Select options={options} onChange={onChange} value={value}/>
    </div>
  );
}
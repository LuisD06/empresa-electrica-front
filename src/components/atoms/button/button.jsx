import './button.scss';
export const Button = ({ children, onClick, disabled = false, type = 'button' }) => {
  return (
    <button className={`button ${disabled && 'button-disabled'}`}  onClick={onClick} disabled={disabled} type={type}>
      { children }
    </button>
  );
}
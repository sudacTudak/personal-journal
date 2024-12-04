import styles from './Button.module.css';
import cn from 'classnames';

function Button({ children, accent = true, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        styles['button'],
        { [styles['accent']]: accent },
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;

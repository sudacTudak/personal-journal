import styles from './Body.module.css';
import cn from 'classnames';

function Body({ children, className }) {
  return <div className={cn(styles['body'], className)}>{children}</div>;
}

export default Body;

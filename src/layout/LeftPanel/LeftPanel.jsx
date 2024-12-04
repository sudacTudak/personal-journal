import styles from './LeftPanel.module.css';
import cn from 'classnames';

function LeftPanel({ children, className }) {
  return <div className={cn(styles['left-panel'], className)}>{children}</div>;
}

export default LeftPanel;

import styles from './Header.module.css';
import cn from 'classnames';

function Header({ className }) {
  return (
    <div className={cn(styles['header'], className)}>
      <img
        src="/logo.svg"
        alt="Логотип журнала"
        className={styles['header__logo']}
      />
    </div>
  );
}

export default Header;

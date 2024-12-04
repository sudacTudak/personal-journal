import styles from './NoJournalsLabel.module.css';
import cn from 'classnames';

function NoJournalsLabel({ className }) {
  return (
    <div className={cn(styles['no-journals-label'], className)}>
      Записей пока нет, <span>добавьте первую!</span>
    </div>
  );
}

export default NoJournalsLabel;

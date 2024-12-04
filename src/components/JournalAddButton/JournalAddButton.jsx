import styles from './JournalAddButton.module.css';
import cn from 'classnames';
import CardButton from '../CardButton/CardButton';

function JournalAddButton({ clearForm, className }) {
  return (
    <CardButton
      className={cn(styles['journal-add-btn'], className)}
      onClick={clearForm}
    >
      <img src="./plus.svg" />
      <span>Новое воспоминание</span>
    </CardButton>
  );
}

export default JournalAddButton;

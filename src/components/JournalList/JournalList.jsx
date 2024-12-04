import styles from './JournalList.module.css';
import cn from 'classnames';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import NoJournalsLabel from '../NoJournalsLabel/NoJournalsLabel';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

const sortItems = (a, b) => {
  return a.date < b.date ? 1 : -1;
};

function JournalList({ items, className, setItem, selectedItem }) {
  const { userId } = useContext(UserContext);

  const filteredItems = useMemo(
    () => items.filter((item) => item.userId === userId).sort(sortItems),
    [items, userId]
  );

  if (items.length === 0) {
    return <NoJournalsLabel />;
  }

  return (
    <ul className={cn(styles['journal-list'], className)}>
      {filteredItems.map((item) => (
        <li className={styles['journal-list__item']} key={item.id}>
          <CardButton
            onClick={() => setItem(item)}
            className={cn({ [styles['active']]: item.id === selectedItem?.id })}
          >
            <JournalItem title={item.title} text={item.text} date={item.date} />
          </CardButton>
        </li>
      ))}
    </ul>
  );
}

export default JournalList;

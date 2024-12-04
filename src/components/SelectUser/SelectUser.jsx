import styles from './SelectUser.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context.jsx';

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);
  const handleChange = (e) => {
    setUserId(Number(e.target.value));
    console.log(e.target.value);
  };

  return (
    <select
      name="user"
      id="user"
      value={userId}
      onChange={handleChange}
      className={styles['select-user']}
    >
      <option value="1">Антон</option>
      <option value="2">Вася</option>
    </select>
  );
}

export default SelectUser;

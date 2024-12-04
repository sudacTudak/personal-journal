import { useState, useEffect } from 'react';

export function useLocalStorage(key) {
  const [data, setData] = useState();

  useEffect(() => {
    if (!key) {
      return;
    }

    const res = JSON.parse(localStorage.getItem(key));
    if (res) {
      setData(res);
    }
  }, [key]);

  function saveData(newData) {
    if (!key) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  }

  return [data, saveData];
}

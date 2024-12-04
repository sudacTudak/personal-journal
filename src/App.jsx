import './App.css';
import { v6 as uuidv6 } from 'uuid';
import { useState } from 'react';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import Body from './layout/Body/Body';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/use-localStorage.hook';
import { UserContextProvider } from './context/user.context';
import SelectUser from './components/SelectUser/SelectUser';

function mapJournalItems(items) {
  if (!items || items.length === 0) {
    return [];
  }

  return items.map((item) => ({
    ...item,
    date: new Date(item.date)
  }));
}

function App() {
  const [journalItems, setJournalItems] = useLocalStorage('data');
  const [selectedItem, setSelectedItem] = useState(null);

  const addJournalItem = (newItemData) => {
    if (!newItemData.id) {
      setJournalItems([
        ...mapJournalItems(journalItems),
        { ...newItemData, date: new Date(newItemData.date), id: uuidv6() }
      ]);
    } else {
      setJournalItems([
        ...mapJournalItems(journalItems).map((item) => {
          if (item.id === newItemData.id) {
            return {
              ...newItemData
            };
          } else {
            return item;
          }
        })
      ]);
      setSelectedItem(null);
    }
  };

  const handleClearForm = () => {
    setSelectedItem(null);
  };

  const deleteJournalItem = (itemId) => {
    const deletedItem = journalItems.find((item) => item.id === itemId);
    if (!deletedItem) {
      return false;
    }
    setJournalItems(journalItems.filter((item) => item.id !== itemId));
    setSelectedItem(null);
    return true;
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel className="app__left-panel">
          <Header className="app__header" />
          <SelectUser />
          <JournalAddButton
            className="app__journal-add-btn"
            clearForm={handleClearForm}
          />
          <JournalList
            items={mapJournalItems(journalItems)}
            setItem={setSelectedItem}
            selectedItem={selectedItem}
            className="app__journal-list"
          />
        </LeftPanel>
        <Body className="app__body">
          <JournalForm
            handleSubmit={addJournalItem}
            handleDelete={deleteJournalItem}
            data={selectedItem}
          />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;

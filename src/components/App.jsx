import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import styles from './App.module.css';



  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) || contactsArray;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = event => {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value;
    const number = event.currentTarget.elements.number.value;
    const newContact = { name: name, id: nanoid(), number: number };
    contacts.some(contact => name === contact.name)
      ? alert(`${name} is already in contacts.`)
      : setContacts(prevState => [...prevState, newContact]);
    event.currentTarget.elements.name.value = '';
    event.currentTarget.elements.number.value = '';
  };

  const handleSearch = event => {
    setFilter(event.currentTarget.value);
  };

  const handleFilter = () =>
    filter
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;

  const handleDelete = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm formSubmit={handleSubmit} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter inputSearch={handleSearch} />
      <ContactsList contacts={handleFilter()} onDelete={handleDelete} />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import styles from './App.module.css';

//  class App extends React.Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

const App = () => {
  const contactsArray = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  // componentDidMount() {
  //   const contacts = localStorage.getItem("contacts");
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) this.setState({
  //     contacts: parsedContacts
  //   });
  // }

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) || contactsArray;
  });

  //   componentDidUpdate(prevProps, prevState){
  // if (this.state.contacts !== prevState.contact){
  // localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
  // }
  //   }

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

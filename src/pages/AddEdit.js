// Import useNavigate from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { fireDb } from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import './AddEdit.css';

const initialState = {
  name: "",
  email: "",
  contact: ""
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;

  // Use the useNavigate hook to get the navigation function
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact) {
      toast.error("Please provide value in each input field");
    } else {
      const db = getDatabase(fireDb);
      const contactsRef = ref(db, 'contacts');

      try {
        const newContactRef = await push(contactsRef, state);
        const newContactKey = newContactRef.key;

        console.log('New contact key:', newContactKey);

        toast.success('Contact added successfully');
        // Use navigate directly without the .push method
        setTimeout(() => navigate('/'), 500);
      } catch (error) {
        console.error('Error adding contact:', error.message);
        toast.error('Error adding contact. Please try again.');
      }
    }

    console.log('Form submitted:', state);
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <form style={{ margin: 'auto', padding: '15px', alignContent: 'center', maxWidth: '400px' }} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your Name..." value={name} onChange={handleInputChange} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your Email..." value={email} onChange={handleInputChange} />
        <label htmlFor="contact">Contact</label>
        <input type="number" id="contact" name="contact" placeholder="Your Contact no is..." value={contact} onChange={handleInputChange} />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddEdit;









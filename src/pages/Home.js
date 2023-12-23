import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, child } from 'firebase/database';
import { fireDb } from '../firebase';
import { Link } from 'react-router-dom';
import './Home.css';
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const db = getDatabase(fireDb);
    const contactsRef = ref(db, 'contacts');

    const unsubscribe = onValue(contactsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData(null);
      }
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the contact?")) {
      const db = getDatabase(fireDb);
      const contactsRef = ref(db, 'contacts');

      remove(child(contactsRef, id))
        .then(() => {
          toast.success("Contact deleted successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No.</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Contact</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data !== null &&
            Object.keys(data).map((id, index) => (
              <tr key={id}>
                <th scope='row'>{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <button className='btn btn-delete' onClick={() => onDelete(id)}>Delete</button>
                  <Link to={`/view/${id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

// UserForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserForm.css';

function UserForm({onUserAdded, onClose}) {
  const [user, setUser] = useState({ name: '', email: '', age: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform the POST request to add a new user
      const response = await axios.post('http://localhost:3000/create', user);
      setUser({ name: '', email: '', age: '' }); // Reset the user state
      if (onUserAdded) {
        onUserAdded(); // Refresh the user list
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };


  return (
    <div className="form-modal">
      <form onSubmit={handleSubmit} className="user-form">
      <h2>Add User</h2>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-input"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-input"
        />
        <input
          type="number"
          name="age"
          value={user.age}
          onChange={handleChange}
          placeholder="Age"
          className="form-input"
        />
        <div className="form-actions">
        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
        <input type="submit" value="Submit" className="submit-btn" />
        </div>
      </form>
    </div>
  );
}

export default UserForm;

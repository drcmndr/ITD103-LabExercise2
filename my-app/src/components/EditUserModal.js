// EditUserModal.js
import React, { useState, useEffect } from 'react';
import './EditUserModal.css'; // Ensure you have this CSS file for styles

const EditUserModal = ({ user, isOpen, onSave, onClose }) => {
    // Initialize the local state with the user prop
    const [editedUser, setEditedUser] = useState({ name: '', email: '', age: '' });
  
    useEffect(() => {
        // Update state when the user prop changes
        setEditedUser(user || { name: '', email: '', age: '' });
    }, [user]);

    // Early return if not open or no user, avoiding unnecessary rendering
    if (!isOpen || !user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedUser);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal-content">
                <form onSubmit={handleSubmit} className="edit-form">
                <h2>Edit User</h2>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={editedUser.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={editedUser.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="age">Age:</label>
                    <input
                        id="age"
                        name="age"
                        type="number"
                        value={editedUser.age}
                        onChange={handleChange}
                    />
                    <div className="edit-modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                        <button type="submit" className="update-btn">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;

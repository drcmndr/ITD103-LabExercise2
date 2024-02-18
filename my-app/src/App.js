// App.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditUserModal from './components/EditUserModal';
import axios from 'axios';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
import Search from './components/Search';
import './styles.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...'); // To verify the function is called
      const response = await axios.get('http://localhost:3000/');
      console.log('Users fetched:', response.data); // To see the fetched data
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() !== '') {
      try {
        // Sending a request to the backend search endpoint
        const response = await axios.get(`http://localhost:3000/search/${searchTerm}`);
        setUsers(response.data); // Update the users state with the search result
      } catch (error) {
        console.error('Error searching users:', error);
      }
    } else {
      fetchUsers(); // If the search term is empty, fetch all users again
    }
  };

  const handleSaveChanges = async (updatedUser) => {
    try {
      console.log(`Updating user with ID: ${updatedUser._id}`); // To verify the function is called
      const response = await axios.put(`http://localhost:3000/update/${updatedUser._id}`, updatedUser);
      if (response.status === 200) {
        console.log('User updated:', response.data); // To see the updated data
        fetchUsers();
        setIsEditModalOpen(false); // Close the modal
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEdit = (userToEdit) => {
    setEditingUser(userToEdit);
    setIsEditModalOpen(true);
  };
  
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  
  const handleDelete = async (userId) => {
    try {
      console.log(`Deleting user with ID: ${userId}`); // To verify the function is called
      const response = await axios.delete(`http://localhost:3000/deleteuser/${userId}`);
      if (response.status === 200) {
        console.log(`User with ID: ${userId} has been deleted`);
        fetchUsers(); // Wait for the users to be fetched again
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

const toggleUserForm = () => {
  setIsUserFormOpen(!isUserFormOpen);
};

const closeUserForm = () => {
  setIsUserFormOpen(false);
};

const noMatchesMessage = "No matches found.";

let content;
if (users.length > 0) {
  content = <UsersList users={users} onEdit={handleEdit} onDelete={handleDelete} />;
} else if (searchTerm && users.length === 0) {
  // Only show the no matches message if a search has been performed
  content = <div className="no-matches">{noMatchesMessage}</div>;
}

return (
  <div className="container">
    <h1 className="header">User Management System</h1>
    <button className="add-user-btn" onClick={toggleUserForm}>Add User +</button>
    {isUserFormOpen && (
      <UserForm
        onUserAdded={() => {
          fetchUsers();
          toggleUserForm(); // This will close the UserForm after user is added
        }}
        editingUser={editingUser} // You might want to pass editingUser here if using the same form for editing
        onClose={closeUserForm}
      />
    )}
    <Search onSearch={handleSearch} />
    {content} {/* Render the content here */}
    {isEditModalOpen && (
      <EditUserModal
        isOpen={isEditModalOpen}
        user={editingUser}
        onClose={closeEditModal}
        onSave={handleSaveChanges}
      />
    )}
  </div>
);

};

export default App;

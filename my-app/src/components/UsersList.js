// UsersList.js

import React, { useEffect, useState } from 'react';

function UsersList({ users, onEdit, onDelete }) {

   return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>
            <button className="edit-btn" onClick={() => onEdit(user)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersList;

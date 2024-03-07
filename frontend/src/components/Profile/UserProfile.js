import React from 'react';

const UserProfile = ({ user, onEdit }) => {
  const handleEdit = () => {
    onEdit();
  };
  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleEdit}>Edit Profile</button>
    </div>
  );
};

export default UserProfile;
import React, { useState } from 'react';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';

const ProfilePage = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedUser) => {
    console.log('Updated User:', updatedUser);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <EditProfile user={user} onSave={handleSave} />
      ) : (
        <UserProfile user={user} onEdit={handleEdit}/>
      )}
    </div>
  );
};

export default ProfilePage;
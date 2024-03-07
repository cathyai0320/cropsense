import React, { useState } from 'react';

const EditProfile = ({ user, onSave }) => {
  let [username, setUsername] = useState(user.username);
  let [email, setEmail] = useState(user.email);
  
  const handleSave = () => {
    onSave({ username, email});
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditProfile;
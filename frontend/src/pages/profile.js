import React from 'react';
import ProfilePage from '../components/Profile/ProfilePage';

const Profile = () => {
  const user = {
    username: 'Test',
    email: 'test@example.com',
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'centre',
        alignItems: 'centre',
        height: '100vh'
      }}
    >
      <div>
        <ProfilePage user={user} />
      </div>
    </div>
  );
};

export default Profile;
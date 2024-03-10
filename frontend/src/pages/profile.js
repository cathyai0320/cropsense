import React from 'react';
import ProfilePage from '../components/Profile/ProfilePage';

const Profile = () => {
  const user = {
    username: 'Test',
    email: 'test@example.com',
    nitrogen: 80,
    phosphorus: 71,
    potassium: 47,
    temperature: 27.5,
    humidity: 80.8,
    ph: 6.2,
    rainfall: 105
  };
  return (

    <div>
      <ProfilePage user={user} />
    </div>

  );
};

export default Profile;
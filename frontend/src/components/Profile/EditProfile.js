import './ProfilePage.css';
import React, { useState } from 'react';

const EditProfile = ({ user, onSave }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [nitrogen, setNitrogen] = useState(user.nitrogen);
  const [phosphorus, setPhosphorus] = useState(user.phosphorus);
  const [potassium, setPotassium] = useState(user.potassium);
  const [temperature, setTemperature] = useState(user.temperature);
  const [humidity, setHumidity] = useState(user.humidity);
  const [ph, setPh] = useState(user.ph);
  const [rainfall, setRainfall] = useState(user.rainfall);

  const handleSave = () => {
    onSave({ username, email, nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall });
  };

  return (
    <div className="profile-page-photo">
      <div className="profile-overlay">
        <div className="container">
          <div className="row">
            <div className="text-center mb-3">
              <h2 className="my-3">Edit Profile</h2>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <label className="form-label">Username:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Email:</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="form-label">Nitrogen (parts per million (ppm)):</label>
                <input 
                  className="form-control" 
                  type="number" 
                  value={nitrogen} 
                  onChange={(e) => setNitrogen(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Phosphorus (parts per million (ppm)):</label>
                <input 
                  className="form-control" 
                  type="number" 
                  value={phosphorus} 
                  onChange={(e) => setPhosphorus(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Potassium (parts per million (ppm)):</label>
                <input 
                  className="form-control" 
                  type="number" 
                  value={potassium} 
                  onChange={(e) => setPotassium(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Temperature (Celsius):</label>
                <input 
                  className="form-control" 
                  type="number" 
                  value={temperature} 
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Humidity (Percentage):</label>
                <input 
                  className="form-control" 
                  type="number" 
                  value={humidity} 
                  onChange={(e) => setHumidity(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">pH:</label>
                <input 
                  className="form-control" 
                  type="number" 
                  value={ph} 
                  onChange={(e) => setPh(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Rainfall (mm):</label>
                <input 
                  className="form-control" 
                  type="number" 
                  value={rainfall} 
                  onChange={(e) => setRainfall(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn bg-dark text-white" type="button" onClick={handleSave}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

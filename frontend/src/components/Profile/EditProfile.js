import './ProfilePage.css';
import React, { useState } from 'react';

const EditProfile = ({ user, onSave }) => {
  let [username, setUsername] = useState(user.username);
  let [email, setEmail] = useState(user.email);
  let [nitrogen, setNitrogen] = useState(user.nitrogen);
  let [phosphorus, setPhosphorus] = useState(user.phosphorus);
  let [potassium, setPotassium] = useState(user.potassium);
  let [temperature, setTemperature] = useState(user.temperature);
  let [humidity, setHumidity] = useState(user.humidity);
  let [ph, setPh] = useState(user.ph);
  let [rainfall, setRainfall] = useState(user.rainfall);

  const handleSave = () => {
    onSave({ username, email });
  };

  return (
    <div className="profile-page-photo">
      <div className="profile-overlay">
        <div className="container">
          <div className="row">

              <div className="text-center mb-3">
              <h2 class="my-3">Edit Profile</h2>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="form-label">Username: </label>
                  <input type="text" className="form-control" value={user.username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Email: </label>
                  <input type="text" className="form-control" value={user.email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="form-label" >Nitrogen (parts per million (ppm))</label>
                  <input id='nitrogen' className="form-control" type="number" value={user.nitrogen} />
                </div>
                <div className="col-md-12">
                  <label className="form-label" >Phosphorus: (parts per million (ppm))</label>
                  <input id='phosphorus' className="form-control" type="number" value={user.phosphorus} />
                </div>
                <div className="col-md-12"><label className="form-label" >Potassium: (parts per million (ppm))</label>
                  <input id='potassium' className="form-control" type="number" value={user.potassium} /></div>
                <div className="col-md-12"><label className="form-label" >Temperature: (Celcius)</label>
                  <input id='temperature' className="form-control" type="number" value={user.temperature} /></div>
                <div className="col-md-12"><label className="form-label" >Humidity: (Percentage)</label>
                  <input id='humidity' className="form-control" type="number" value={user.humidity} /></div>
                <div className="col-md-12"><label className="form-label" >pH:</label>
                  <input id='ph' className="form-control" type="number" value={user.ph} /></div>
                <div className="col-md-12"><label className="form-label" >Rainfall: (mm)</label>
                  <input id='rainfall' className="form-control" type="number" value={user.rainfall} /></div>

              </div>
              <div className="mt-5 text-center"><button className="btn bg-dark text-white" type="button" onClick={handleSave}>Save Profile</button></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
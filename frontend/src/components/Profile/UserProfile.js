import './ProfilePage.css';
import React from 'react';

const UserProfile = ({ user, onEdit }) => {
  const handleEdit = () => {
    onEdit();
  };
  return (
    <div className="profile-page-photo">
      <div className="prediction-overlay">
        <div className='container'>
          <div className="row">

              <div className="text-center mb-3">
              <h2 className="my-3">User Profile</h2>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="form-label">Username: </label>
                  <input type="text" className="form-control" readOnly value={user.username}></input>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Email: </label>
                  <input type="text" className="form-control" readOnly value={user.email}></input>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="form-label" >Nitrogen (parts per million (ppm))</label>
                  <input id='nitrogen' className="form-control" type="number" readOnly value={user.nitrogen} />
                </div>
                <div className="col-md-12">
                  <label className="form-label" >Phosphorus: (parts per million (ppm))</label>
                  <input id='phosphorus' className="form-control" type="number" readOnly value={user.phosphorus} />
                </div>
                <div className="col-md-12"><label className="form-label" >Potassium: (parts per million (ppm))</label>
                  <input id='potassium' className="form-control" type="number" readOnly value={user.potassium} /></div>
                <div className="col-md-12"><label className="form-label" >Temperature: (Celcius)</label>
                  <input id='temperature' className="form-control" type="number" readOnly value={user.temperature} /></div>
                <div className="col-md-12"><label className="form-label" >Humidity: (Percentage)</label>
                  <input id='humidity' className="form-control" type="number" readOnly value={user.humidity} /></div>
                <div className="col-md-12"><label className="form-label" >pH:</label>
                  <input id='ph' className="form-control" type="number" readOnly value={user.ph} /></div>
                <div className="col-md-12"><label className="form-label" >Rainfall: (mm)</label>
                  <input id='rainfall' className="form-control" type="number" readOnly value={user.rainfall} /></div>

              </div>
              <div className="mt-5 text-center"><button className="btn bg-dark text-white" type="button" onClick={handleEdit}>Edit Profile</button></div>

          </div>
        </div>
      </div>

    </div>

  );
};

export default UserProfile;

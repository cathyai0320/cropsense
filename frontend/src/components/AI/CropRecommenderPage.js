import './CropRecommenderPage.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { getBestCrop, isDoingAnalysis, cropRecommenderError } from '../AI/Prediction';

const CropRecommenderPage = () => {
  let [nitrogen, setNitrogen] = useState(0);
  let [phosphorus, setPhosphorus] = useState(0);
  let [potassium, setPotassium] = useState(0);
  let [temperature, setTemperature] = useState(0);
  let [humidity, setHumidity] = useState(0);
  let [ph, setPh] = useState(0);
  let [rainfall, setRainfall] = useState(0);
  let [useUserInfo, setUseUserInfo] = useState(false);
  let [selectedModel, setSelectedModel] = useState('svc');
  let [recommendedCrop, setRecommendedCrop] = useState('');

  let { isAuthenticated } = useAuth();


  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  const handleAnalyze = async () => {
    if (nitrogen < 0 || phosphorus < 0 || potassium < 0 || temperature < 0 || humidity < 0 || ph < 0 || rainfall < 0) {
      alert('Please enter valid values');
      return;
    }
    if (temperature > 50 || humidity > 100 || ph > 14 || rainfall > 1000) {
      alert('Please enter valid values');
      return;
    }

    let params = [
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      ph,
      rainfall,
    ];

    let prediction = await getBestCrop(params, selectedModel);
    if (prediction !== '') {
      setRecommendedCrop(prediction);
      console.log(prediction);
    }
  };

  return (
    <div className="predict-page-photo">
      <div className="prediction-overlay">
        <div className="container">
          <h2 className="my-3">Crop Recommender</h2>
          <form onSubmit={handleAnalyze}>
            <div className="mb-3">
              <label htmlFor='selectedModel' className="text-white" >Choose a Model:</label>
              <select id='selectedModel' className="form-control" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                <option value="svc">SVM</option>
                <option value="knn">KNN</option>
                <option value="gnb">GaussianNB</option>
              </select>
              <br />
            <label htmlFor='nitrogen' className="form-label" >Nitrogen (parts per million (ppm))</label>
            <input id='nitrogen' className="form-control" type="number" value={nitrogen} min="0" step="1" onChange={(e) => setNitrogen(e.target.value)} /><br />
            <label htmlFor='phosphorus' className="form-label">Phosphorus: (parts per million (ppm))</label>
            <input id='phosphorus' className="form-control" type="number" value={phosphorus} min="0" step="1" onChange={(e) => setPhosphorus(e.target.value)} /><br />
            <label htmlFor='potassium' className="form-label">Potassium: (parts per million (ppm))</label>
            <input id='potassium' className="form-control" type="number" value={potassium} min="0" step="1" onChange={(e) => setPotassium(e.target.value)} /><br />
            <label htmlFor='temperature' className="form-label">Temperature: (Celcius)</label>
            <input id='temperature' className="form-control" type="number" value={temperature} min="0" max="50" step="0.1" onChange={(e) => setTemperature(e.target.value)} /><br />
            <label htmlFor='humidity' className="form-label">Humidity: (Percentage)</label>
            <input id='humidity' className="form-control" type="number" value={humidity} min="0" max="100" step="0.1" onChange={(e) => setHumidity(e.target.value)} /><br />
            <label htmlFor='ph' className="form-label">pH:</label>
            <input id='ph' className="form-control" type="number" value={ph} min="0" max="14" step="0.1" onChange={(e) => setPh(e.target.value)} /><br />
            <label htmlFor='rainfall' className="form-label">Rainfall: (mm)</label>
            <input id='rainfall' className="form-control" type="number" value={rainfall} min="0" max="1000" step="0.1" onChange={(e) => setRainfall(e.target.value)} /><br />


              <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input id="useUserInfo" type="checkbox" className="btn-check" autoComplete="off" checked={useUserInfo} onChange={(e) => setUseUserInfo(e.target.checked)}/>
                <label className="btn btn-outline-light custom-btn" htmlFor="useUserInfo">Use user's information</label>
                <br />
                  <button type="submit" className="btn btn-outline-light custom-btn">Analyze</button>
                </div>
                <br />
                <br />
              <label htmlFor='recommendedCrop' className="form-label">Recommended Crop: </label>
              <input id='recommendedCrop' className="form-control" type="text" value={recommendedCrop} />
            </div>
          </form>
        </div>  
      </div>
    </div>


  );
};

export default CropRecommenderPage;
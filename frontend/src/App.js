import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Home from "./pages";
import About from "./pages/about";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import CropRecommenderPage from "./pages/crop_recommender";
import SignIn from "./pages/signin";
import { AuthProvider } from './components/Auth/AuthContext';
import AuthGuard from './components/Auth/AuthGuard';
import ChatbotPage from './components/AI/ChatbotPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<AuthGuard><Profile /></AuthGuard>} />
          <Route path='/croprecommender' element={<AuthGuard><CropRecommenderPage /></AuthGuard>} />
          <Route path='/chatbot' element={<AuthGuard><ChatbotPage /></AuthGuard>} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_PROD_BASE_URL
  : process.env.REACT_APP_DEV_BASE_URL;

const AuthProvider = ({ children }) => {
  let [token, setToken] = useState(null);
  let [registrationError, setRegistrationError] = useState(null);
  let [isRegistering, setIsRegistering] = useState(false);
  let [loginError, setLoginError] = useState(null);
  let [isLogging, setIsLogging] = useState(false);
  let isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  useEffect(() => {
    let storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const register = async (userData) => {
    try {
      setIsRegistering(true);
      let response = await fetch(`${baseURL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      let data = await response.json();

      if (!response.ok) {
        console.log(data.msg);
        throw new Error('Registration failed. ' + data.msg);
      }

      // Registration successful
      setRegistrationError(null);
      setIsRegistering(false);

      setToken(data.token);
      localStorage.setItem('token', data.token);
      return true;
    } catch (error) {
      setRegistrationError(error.message);
      setIsRegistering(false);
      return false;
    }
  };

  const login = async (userData) => {
    try {
      setIsLogging(true);
      let response = await fetch(`${baseURL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      let data = await response.json();

      if (!response.ok) {
        console.log(data.msg);
        throw new Error('Login failed. ' + data.msg);
      }

      // login successful
      setLoginError(null);
      setIsLogging(false);

      setToken(data.token);
      localStorage.setItem('token', data.token);

      return true;
    } catch (error) {
      setLoginError(error.message);
      setIsLogging(false);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, loginError, isLogging, logout, register, registrationError, isRegistering }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

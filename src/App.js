import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import LoginPage from './component/loginPage/LoginPage';
import MainPage from './component/mainPage/MainPage';
import { fetchUserData } from './service/LoginServices';

function App() {
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (accessToken) {
      const getUserData = async () => {
        try {
          const data = await fetchUserData(accessToken);
          setUserData(data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      getUserData();
    }
  }, [accessToken]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null); 
    setUserData(null);
  };

  return (
    <Router>
      <Routes>
      <Route
      path="/"
      element={<Navigate to="/auth/login" />}
    />
      <Route
          path="/auth/login"
          element={accessToken && userData ? (
            <Navigate to="/home" />
          ) : (
            <LoginPage setUserData={setUserData} setAccessToken={setAccessToken} />
          )}
        />
        <Route path="/home" element={<MainPage userData={userData} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;

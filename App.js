import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from './components/Login/LoginForm';
import Home from './components/Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    AsyncStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  const loginHandler = () => {
    AsyncStorage.setItem('isLoggedIn', '1')
    console.log("logged in")
    setIsLoggedIn(true);
  }

  return (
    <>
      {!isLoggedIn && <LoginForm onLogin={loginHandler} />}
      {isLoggedIn && <Home />}
    </>
  );
};

export default App;

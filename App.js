import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from './components/Login/LoginForm';
import Home from './components/Home';
import AccountDetail from './components/Accounts/AccountDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CloudBankMasthead from './components/UI/CloudBankMasthead';

const Stack = createNativeStackNavigator();

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
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <CloudBankMasthead />
      }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home">
                {props => <Home {...props} />}
            </Stack.Screen>
            <Stack.Screen name="AccountDetail">
              {props => <AccountDetail {...props} accountNumber='100' />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {props => <LoginForm {...props} onLogin={loginHandler} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
      {/* {!isLoggedIn && <LoginForm onLogin={loginHandler} />}
      {isLoggedIn && <Home />} */}
    </NavigationContainer>
  );
};

export default App;

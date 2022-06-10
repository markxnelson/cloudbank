import React, { useContext, useEffect } from 'react';
import AuthContext, { AuthContextProvider } from './store/auth-context';
import LoginForm from './components/Login/LoginForm';

const App = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log(authCtx.isLoggedIn)
  }, [authCtx.isLoggedIn])

  return (
    <AuthContextProvider>
      {!authCtx.isLoggedIn && <LoginForm />}
      {authCtx.isLoggedIn && <Home />}
    </AuthContextProvider>
  );
};

export default App;

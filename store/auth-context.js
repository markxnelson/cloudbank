import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { }
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInfo = AsyncStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInfo === '1') {
          setIsLoggedIn(true);
        }
      }, [isLoggedIn, setIsLoggedIn])

    const logoutHandler = () => {
        AsyncStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        AsyncStorage.setItem('isLoggedIn', '1')
        console.log("logged in")
        setIsLoggedIn(true);
    }

    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
    }}>{props.children}</AuthContext.Provider>
}

export default AuthContext;
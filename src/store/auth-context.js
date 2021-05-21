import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({

    isLoggedIn: false,
    onLoginHandler: (email, pwd) => {},
    onLogoutHandler : () => {}
});


export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect( () => {
        if (localStorage.getItem('isLoggedIn') === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const onLoginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    const onLogoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    }


    return (
        
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLoginHandler: onLoginHandler,
            onLogoutHandler: onLogoutHandler
        }}> 
            {props.children} 
        </AuthContext.Provider>
    )
}

export default AuthContext;

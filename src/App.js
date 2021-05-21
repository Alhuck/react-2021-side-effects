import React, { useState, useEffect, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext, {AuthContextProvider} from './store/auth-context';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(()=> {
  //   if (localStorage.getItem('IsLoggedIn') === '1') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('IsLoggedIn', '1');
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  //   localStorage.setItem('IsLoggedIn', '0');
  // };


  const authCtx = useContext(AuthContext);
  
  return (
      <React.Fragment>
        <MainHeader />
          <main>
            {!authCtx.isLoggedIn && <Login />}
            {authCtx.isLoggedIn && <Home />}
          </main>
    </React.Fragment>    
  );
}

export default App;

import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {val: action.val, isValid: action.val.includes('@')}
  }
  if (action.type === 'INPUT_BLUR') {
    return { val: state.val, isValid: state.val.includes('@') }
  }
  return {
    val: '',
    isValid: false
  }
};

const pwdReducer = (prevState, action) => {


  if (action.type == 'USER_INPUT') {
    return {
      val: action.val,
      isValid: action.val.trim().length > 6
    }
  }

  if (action.type == 'INPUT_BLUR') {
    return {
      val: prevState.val,
      isValid: prevState.val.trim().length > 6
    }
  }

  return {
    val: '',
    isValid: false
  }

}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  
  const [formIsValid, setFormIsValid] = useState(false);

  const[pwdState, pwdDispathFn] = useReducer(pwdReducer, {
    val: '', 
    isValid: null
  });

  const [emailState, dispatchFn] = useReducer(emailReducer, {
    val: '',
    isValid: null
  });

  //  const [pwdState, pwdDispatchFn] = useReducer(pwdReducer, {
  //    val: '',
  //    isValid: null
  //  })


  // useEffect(()=> {

  //   const handler = setTimeout( () => {
      
  //     console.log('INSIDE SET TIMEOUT');
  //     setFormIsValid(
  //       emailState.val.includes('@') && enteredPassword.trim().length > 6
  //     )
  //   }, 500);

  //   return () => {
  //     console.log('INSIDE CLEANUP FUNCTION');
  //     clearTimeout(handler);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {

    dispatchFn({
      type: 'USER_INPUT',
      val: event.target.value
    })

    
    setFormIsValid(
      // emailState.val.includes('@') && enteredPassword.trim().length > 6
      emailState.isValid && pwdState.isValid
    )
  };

  const passwordChangeHandler = (event) => {

    pwdDispathFn({
      type: 'USER_INPUT',
      val: event.target.value
    });

    setFormIsValid(
      // emailState.val.includes('@') && enteredPassword.trim().length > 6
      emailState.isValid && pwdState.isValid
    )
  };

  const validateEmailHandler = () => {

    // setEmailIsValid(emailState.val.includes('@'));
    dispatchFn({
      type: 'INPUT_BLUR'
    })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    pwdDispathFn({
      type: 'INPUT_BLUR'
    })

  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.val, pwdState.val);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            pwdState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pwdState.val}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

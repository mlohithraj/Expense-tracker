import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Signup.module.css';

const Signup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [confirmEnteredPassword, setConfirmEnteredPassword] = useState('');

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!isLogin) {
      const confirmEnteredPasswordValue = confirmPasswordInputRef.current.value;
      setConfirmEnteredPassword(confirmEnteredPasswordValue);

      if (enteredPassword !== confirmEnteredPasswordValue) {
        alert('Password does not match. Please re-enter password...');
        return;
      }
    }

    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyA-q0e_kzrsBi07QnurND_HsTyTaiZBw';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyA-q0e_kzrsBi07QnurND_HsTyTaiZBw';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication Failed';

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {})
      .catch((error) => {
        alert(error.errorMessage);
      });
  };

  return (
    <div>
      <div className={classes.container}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <label>Email Id</label>
            <br />
            <input
              type="email"
              placeholder="Email"
              className={classes.input}
              ref={emailInputRef}
            />
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Password"
              className={classes.input}
              ref={passwordInputRef}
            />
          </div>
          {!isLogin && (
            <div>
              <label>Confirm Password</label>
              <br />
              <input
                type="password"
                placeholder="Re-Enter Password"
                className={classes.input}
                ref={confirmPasswordInputRef}
              />
            </div>
          )}
          <button type="submit" className={classes.submit}>
            {isLogin ? <Link to='/Login'>'Login'</Link> : 'Sign Up'}
          </button>
        </form>
      </div>

      <div className={classes.account}>
        <p>
          {isLogin ? "Don't have an Account?" : 'Have an Account?'}{' '}
          <button onClick={switchHandler}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;

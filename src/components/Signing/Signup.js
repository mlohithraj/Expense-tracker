import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Signup.module.css';

const Signup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(false);

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmEnteredPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== confirmEnteredPassword) {
      alert('Password does not match. pls re-enter password...');
      return;
    }

    let url;
    if (isLogin) {
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

            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        alert('Authentication successful', data);
      })
      .catch((error) => {
        console.error('Authentication failed:', error.message);
      });
  };

  return (
    <div>
      <div className={classes.container}>
        <h2>Sign Up</h2>
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
          <button type="submit" className={classes.submit}>
            Sign Up
          </button>
        </form>
      </div>
      <div className={classes.account}>
        <p>
          Have an Account? <button onClick={switchHandler}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;

import React from 'react';

const LoginForm = ( props ) => {
  return (
    <form onSubmit={props.login}>
          <div>
            <p>Username</p>
            <input 
              type="text"
              value={props.username}
              onChange={props.handleNameChange}
            />
          </div>
          <div>
            <p>Password</p>
            <input 
              type="password"
              value={props.password}
              onChange={props.handlePasswordChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
  );
};

export default LoginForm;
import React from 'react';

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <form onSubmit={handleSubmit}>
          <div>
            <p>Username</p>
            <input 
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Password</p>
            <input 
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
  );
};

export default LoginForm;
import React, { useState } from 'react';
import './login.css';

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await fetch('https://your-backend-api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          setUsername(userData.username); // Assuming your API returns the username
          setLoggedIn(true);
        } else {
          // Handle authentication failure
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
  };

  return (
    <div>
      {/* {loggedIn ? (
        <h2>Welcome, {username}!</h2>
      ) : (
        <div>
          <h2>Login</h2>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )} */}
    </div>
  );
}

export default Login;

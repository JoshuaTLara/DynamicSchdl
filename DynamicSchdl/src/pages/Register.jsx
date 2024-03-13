import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // New state for displaying messages
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    const bodyObj = {
      email,
      password,
    };

    try {
      const res = await axios.post('/api/register', bodyObj);

      if (res.data.success) {
        setMessage(res.data.message);
        navigate('/navbar/Home');
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Registration failed. Please try again.');
    }
  };
  return (
    <>
    <div className='Register'>

    <h1 className='RegisterTitle'>Register</h1>
    {message && <p>{message}</p>}
    <form onSubmit={handleRegister}>
      <div>
        <input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button class='RegisterButton' type="submit">Register</button>
      </div>
    </form>
    </div>
  </>
  )
}

export default Register
import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.get('/api/logout');

    if (res.data.success) {
      dispatch({
        type: 'LOGOUT'
      });

      navigate('/');
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
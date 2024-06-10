import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function AuthLayout({ children, authentication = true }) {
  const authStatus = useSelector(state => state.userReducer.status);
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate('/login');
    } else if (!authentication && authStatus) {
      navigate('/');
    }
    setIsloading(false);
  }, [authStatus, authentication, navigate]);

   return isLoading ? <Loader/> : <>{children}</>
}

export default AuthLayout
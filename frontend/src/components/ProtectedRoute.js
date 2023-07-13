import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, loggedIn, ...rest }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loggedIn) {
      navigate('/sign-in');
    }
  }, [loggedIn, navigate]);

  return loggedIn ? <Component {...rest} /> : null;
}

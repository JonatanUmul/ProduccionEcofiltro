import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function isTokenValid(token) {
  const decodedToken = parseJwt(token);
  if (!decodedToken) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp > currentTime;
}

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
console.log('desde Token',token)
  if (!token || !isTokenValid(token)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

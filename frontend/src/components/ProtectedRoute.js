import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ loggedIn, children, ...props }) {
  return (
    <Route {...props}>
      {loggedIn ? children : <Redirect to="/signin" />}
    </Route>
  )
}

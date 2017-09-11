import React from 'react';
import { Route } from 'react-router-dom';

const CustomRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

export default CustomRoute;

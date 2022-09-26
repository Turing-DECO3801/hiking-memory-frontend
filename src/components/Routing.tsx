import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import NoMatch from '../pages/NoMatch/NoMatch';
import SingleView from '../pages/SingleView/SingleView';
import PhotoCollection from '../pages/Photos/Photos';
import AllHikes from '../pages/AllHikes/AllHikes';

/** All routes */
export const routes: RouteConfig[] = [
  {
    path: '/login',
    name: 'Login',
    exact: true,
    Component: Login,
    secured: false
  },
  {
    path: '/',
    name: 'Home',
    exact: true,
    Component: Home,
    secured: true
  },
  {
    path: '*',
    name: 'NoMatch',
    exact: false,
    Component: NoMatch,
    secured: false
  },
  {
    path: '/singleview',
    name: 'SingleView',
    exact: true,
    Component: SingleView,
    secured: true
  },
  {
    path: '/photos',
    name: 'PhotoCollection',
    exact: true,
    Component: PhotoCollection,
    secured: true
  },
  {
    path: '/allhikes',
    name: 'AllHikes',
    exact: true,
    Component: AllHikes,
    secured: true
  }
];

/**
 * Map over and render routes + handle navigation.
 */
const Routing = () => {
  return (
    <Routes>
      {routes.map(({ path, Component, secured }) => (
        <Route
          key={path}
          path={path}
          element={
            <RequireAuth secured={secured} redirectTo={path}>
              <Component />
            </RequireAuth>
          }
        />
      ))}
    </Routes>
  );
};

export default Routing;

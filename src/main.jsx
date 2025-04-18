import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';

// Global CSS (TODO: migrate to SCSS?)
import './css/layout.css'
import './css/colors.css'
import './css/helpers.css'
import './css/fonts.css'
import 'bootstrap/dist/css/bootstrap.css'

import ForOhFor from './pages/for_oh_for'
import Layout from './pages/layout'
import Home from './pages/home.tsx'
import Bookings from './pages/bookings.tsx';
//import Authenticated from './pages/authenticated'
//import Dashboard from './pages/dashboard'


// TODO: I'm not sure if this is the better way
async function requireAuth() {
  /*if (!fakeAuth.isAuthenticated()) return redirect('/login?redirect=fakeAuth');
  return { me: fakeAuth.getUser() };*/
}

// This is new!
const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <ForOhFor />,
    children: [
      { index: true, Component: Home },
      { path: '/bookings', Component: Bookings },
      /*{ // For the future, if Authentication is needed
        Component: Authenticated, loader: requireAuth, children: [
          { path: '/dashboard/:IdProperty', Component: Dashboard },          
        ]
      }*/
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* REDUX */}
    <Provider store={store}>
      {/* REACT ROUTER */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

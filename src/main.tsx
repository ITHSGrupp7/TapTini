import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CartPage from './pages/CartPage.tsx';
import SiderPage from './pages/SiderPage.tsx';
// Dokumentation finns https://reactrouter.com/en/main/start/tutorial
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage.tsx';


const router = createBrowserRouter([
  {
  path: '/',
  element: <App/>,
  errorElement: <NotFoundPage/>,
  },
  {
    path: '/cart',
    element: <CartPage/>,
  },
  {
    path: '/siders',
    element: <SiderPage/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)

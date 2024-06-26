import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import './index.css';
import NewProduct from './pages/NewProduct';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import ProtectedRoute from './pages/ProtectedRoute';
import Search from './pages/Search.jsx';
import NotFound from './pages/NotFound';
import CartLogin from './pages/CartSignin.jsx';
import FilteredProducts from './pages/FilteredProducts.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: ':category',
        element: <FilteredProducts />,
      },
      {
        path: ':category/products/:productId',
        element: <ProductDetail />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'search/products/:productId',
        element: <ProductDetail />,
      },
      {
        path: 'products/new',
        element: (
          <ProtectedRoute requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: 'products/:id',
        element: <ProductDetail />,
      },
      {
        path: 'cart/:uid',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: 'cart', element: <CartLogin /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

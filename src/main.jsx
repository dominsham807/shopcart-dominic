import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.jsx'
import './index.css'
import 'swiper/css';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// fonts and icons
import '././assets/css/icofont.min.css';
import '././assets/css/animate.css';
import './assets/sass/style.scss'
// import '././assets/css/style.min.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './redux/store.js';
import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx';
import Signup from './pages/Signup.jsx'
import Shop from './pages/Shop.jsx'
import Login from './pages/Login.jsx'
import ShopProduct from './pages/ShopProduct.jsx'
import Cart from './pages/Cart.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/shop',
        element: <Shop />,
      },
      {
        path: '/shop/:id',
        element: <ShopProduct />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)

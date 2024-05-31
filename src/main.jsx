import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import NewPost from './pages/NewPost.jsx'
import PostDetailsPage from './pages/PostDetailsPage.jsx'
import Home from './pages/Home.jsx'

// react router paths and elements
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <LoginPage/>
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <SignupPage/>
          </AuthLayout>
        )
      },
      {
        path: '/post/new',
        element: (
          <AuthLayout authentication={ true }>
            <NewPost/>
          </AuthLayout>
        )
      },
      {
        path: '/post/details',
        element: (
          <AuthLayout authentication = {true}>
            <PostDetailsPage />
          </AuthLayout>
        )
      }
      
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

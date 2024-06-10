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
import UserPostPage from './pages/UserPostPage.jsx'
import PostEditPage from './pages/PostEditPage.jsx'

// react router paths and elements
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication={false}>
            <Home/>
          </AuthLayout>
        ),
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
        path: '/post/:slug',
        element: (
          <AuthLayout authentication = {true}>
            <PostDetailsPage />
          </AuthLayout>
        )
      },
      {
        path: '/post/edit/:slug',
        element: (
          <AuthLayout authentication={true}>
            <PostEditPage/>
          </AuthLayout>
        )
      },
      {
        path: '/post/user/:userId',
        element: (
          <AuthLayout authentication={true}>
            <UserPostPage/>
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

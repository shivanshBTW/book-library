import App from 'src/App';
import BookDetailsPage from 'src/pages/BookDetailsPage';
import Home from 'src/pages/Home';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: 'books',
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: ':id',
            element: <BookDetailsPage />,
          },
        ],
      },

      {
        index: true,
        element: <Navigate to={'/books'} replace />,
      },
    ],
  },
]);

export default router;

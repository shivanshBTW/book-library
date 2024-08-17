import App from 'src/App';
import BookDetailsPage from 'src/pages/BookDetailsPage';
import Home from 'src/pages/Home';
import { createBrowserRouter } from 'react-router-dom';

export const routes = {
  home: '/',
};

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: ':id',
        element: <BookDetailsPage />,
      },
      {
        path: '*',
        element: <div>404 - Page not found</div>,
      },
    ],
  },
]);

export default router;

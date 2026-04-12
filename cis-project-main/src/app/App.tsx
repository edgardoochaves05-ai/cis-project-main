import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CareerServiceProvider } from './context/CareerServiceContext';

export default function App() {
  return (
    <CareerServiceProvider>
      <RouterProvider router={router} />
    </CareerServiceProvider>
  );
}

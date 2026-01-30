import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes } from '@/app/Routes/public.routes';

const router = createBrowserRouter([
  ...publicRoutes,
  // Add more route groups here if needed
  // ...privateRoutes,
  // ...adminRoutes,
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
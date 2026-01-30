import Home from "@/Page/Home/Home";
import About from "@/Page/Home/About";
import Table from  "@/Page/Table/index.js"

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: '/table', element: <Table />}
];
import Home from "@/Page/Home/Home";
import About from "@/Page/Home/About";
import Table from  "@/Page/Table/index"
import DynamicRouting from "@/Page/DynamicRouting/index"
import Todo from "@/Page/Todo/index";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: '/table', element: <Table />},
  { path: "/dynamic-routing", element: <DynamicRouting />},
  { path: '/todo', element: <Todo /> }
];
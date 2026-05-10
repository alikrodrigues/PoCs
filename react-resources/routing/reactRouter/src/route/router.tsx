import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";

// 1. Definição das rotas e caminhos
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

// 2. Renderização do provedor na raiz da aplicação
export default function AppRouter() {
  return <RouterProvider router={router} />;
}

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.js";
import { useState } from "react";

export type AuthContext = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth: AuthContext = {
    isLoggedIn,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };

  return <RouterProvider router={router} context={{ auth }} />;
}

export default App;

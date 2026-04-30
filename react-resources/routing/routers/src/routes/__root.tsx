import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav
        style={{
          padding: "10px",
          display: "flex",
          gap: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Link to="/" activeProps={{ style: { fontWeight: "bold" } }}>
          Home
        </Link>
        <Link to="/sobre" activeProps={{ style: { fontWeight: "bold" } }}>
          Sobre
        </Link>
      </nav>

      <hr />

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </>
  ),
});

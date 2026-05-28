import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location, context }) => {
    // Agora usamos o contexto injetado no App.tsx
    if (!context.auth.isLoggedIn) {
      throw redirect({
        to: "/",
        search: {
          // Opcional: passar a URL atual para redirecionar de volta após login
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <div
      style={{
        border: "2px dashed #4CAF50",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <div
        style={{ marginBottom: "1rem", color: "#4CAF50", fontWeight: "bold" }}
      >
        🔒 Authenticated Area
      </div>
      <Outlet />
    </div>
  ),
});

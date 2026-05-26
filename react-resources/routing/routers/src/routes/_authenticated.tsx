import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

const auth = {
  isLoggedIn: true,
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    if (!auth.isLoggedIn) {
      throw redirect({
        to: "/",
        search: {
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

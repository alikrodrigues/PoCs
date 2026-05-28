import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoggedIn) {
      throw redirect({ to: "/" });
    }
  },
  loader: async () => {
    return { secretMessage: "Você tem acesso ao painel admin!" };
  },
  component: AdminComponent,
});

function AdminComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
      <h1>Painel Admin</h1>
      <p>{data.secretMessage}</p>
      <Outlet />
    </div>
  );
}

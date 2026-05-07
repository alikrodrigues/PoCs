import { createFileRoute, redirect } from "@tanstack/react-router";

// simula um check de autenticação
const fakeAuth = {
  isLoggedIn: false,
};

export const Route = createFileRoute("/admin")({
  // beforeLoad roda ANTES do loader — serve como guard
  beforeLoad: async () => {
    if (!fakeAuth.isLoggedIn) {
      // redireciona pra home se não estiver logado
      throw redirect({ to: "/" });
    }
  },
  loader: async () => {
    // só chega aqui se o beforeLoad passou
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
    </div>
  );
}

import { createRootRouteWithContext, Link, Outlet, useRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface MyRouterContext {
  auth: {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
  };
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { auth } = Route.useRouteContext();
  const router = useRouter();

  const handleAuth = async () => {
    if (auth.isLoggedIn) {
      auth.logout();
    } else {
      auth.login();
    }
    // Invalida as rotas para re-rodar beforeLoad/loaders
    await router.invalidate();
  };

  return (
    <>
      <nav
        style={{
          padding: "10px",
          display: "flex",
          gap: "10px",
          borderBottom: "1px solid #ccc",
          alignItems: "center",
        }}
      >
        <Link to="/" activeProps={{ style: { fontWeight: "bold" } }}>
          Home
        </Link>
        <Link to="/users" activeProps={{ style: { fontWeight: "bold" } }}>
          Usuários
        </Link>
        <Link to="/admin" activeProps={{ style: { fontWeight: "bold" } }}>
          Admin
        </Link>
        <Link to="/characters" activeProps={{ style: { fontWeight: "bold" } }}>
          Personagens (Auth)
        </Link>
        <button
          onClick={handleAuth}
          style={{
            marginLeft: "auto",
            padding: "5px 10px",
            cursor: "pointer",
            background: auth.isLoggedIn ? "#ff4444" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {auth.isLoggedIn ? "Sair" : "Entrar"}
        </button>
      </nav>

      <hr />

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </>
  );
}

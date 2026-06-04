import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { z } from "zod";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const userSearchSchema = z.object({
  filter: z.string().optional().catch(""),
});

// loader roda ANTES do componente montar — dado já chega pronto
export const Route = createFileRoute("/users")({
  validateSearch: (search) => userSearchSchema.parse(search),
  loaderDeps: ({ search: { filter } }) => ({ filter }),
  staleTime: 10_000, // tempo que o dado é valido para uso em cache
  // gcTime: 30 minutos. Tempo que os dados ficam em memória após a rota se tornar inativa.
  gcTime: 30 * 60 * 1000,
  loader: async ({ deps: { filter } }) => {
    console.log(" usuarios filtrados:", filter);
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Falha ao buscar usuários");
    const users = (await res.json()) as User[];

    if (filter) {
      return users.filter((user) =>
        user.name.toLowerCase().includes(filter.toLowerCase()),
      );
    }

    return users;
  },
  pendingComponent: () => <p>Carregando usuários...</p>,
  errorComponent: ({ error }) => <p>Erro: {(error as Error).message}</p>,
  component: UsersComponent,
});

function UsersComponent() {
  // useLoaderData é síncrono — sem useState, sem useEffect
  const users = Route.useLoaderData();
  const { filter } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const router = useRouter();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({ ...prev, filter: e.target.value || undefined }),
      replace: true, // evita entupir o histórico do browser
    });
  };

  const handleRefresh = () => {
    router.invalidate();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Usuários</h1>
        <button
          onClick={handleRefresh}
          style={{
            padding: "8px 16px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Recarregar Dados (Invalidate)
        </button>
      </div>

      <p>
        Estes dados estão em cache (staleTime: 10s). Abra o console para ver
        quando o loader é disparado.
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="filter">Filtrar por nome: </label>
        <input
          id="filter"
          type="text"
          value={filter || ""}
          onChange={handleFilterChange}
          placeholder="Digite um nome..."
          style={{
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Nome
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Email
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Telefone
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {user.name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {user.email}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {user.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

// loader roda ANTES do componente montar — dado já chega pronto
export const Route = createFileRoute("/users")({
  loader: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Falha ao buscar usuários");
    return (await res.json()) as User[];
  },
  pendingComponent: () => <p>Carregando usuários...</p>,
  errorComponent: ({ error }) => <p>Erro: {(error as Error).message}</p>,
  component: UsersComponent,
});

function UsersComponent() {
  // useLoaderData é síncrono — sem useState, sem useEffect
  const users = Route.useLoaderData();

  return (
    <div>
      <h1>Usuários</h1>
      <p>Esses dados vieram do loader, não de um useEffect.</p>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Nome</th>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Email</th>
            <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.name}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.email}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

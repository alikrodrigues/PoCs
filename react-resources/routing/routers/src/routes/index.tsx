import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div>
      <h1>Página Inicial</h1>
      <p>Bem-vindo à PoC de TanStack Router!</p>
    </div>
  );
}

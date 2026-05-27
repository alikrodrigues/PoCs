import { createFileRoute } from "@tanstack/react-router";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

type ApiResponse = {
  results: Character[];
};

export const Route = createFileRoute("/_authenticated/characters")({
  loader: async (): Promise<ApiResponse> => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    if (!res.ok) throw new Error("Failed to fetch characters");
    return res.json();
  },
  component: CharactersComponent,
});

function CharactersComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
      <h2>Rick and Morty Characters</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {data.results.map((char) => (
          <div
            key={char.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={char.image}
              alt={char.name}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <h3 style={{ margin: "10px 0 5px" }}>{char.name}</h3>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              {char.species} - {char.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

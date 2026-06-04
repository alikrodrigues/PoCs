import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  staleTime: 30_000,
  loader: async ({ params }) => {
    console.log(`Buscando post ${params.postId}...`);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.postId}`,
    );
    if (!res.ok) throw new Error("Falha ao buscar post");
    return await res.json();
  },
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();
  const post = Route.useLoaderData();

  return (
    <div>
      Post ID: {postId} <br /> {post.title}
    </div>
  );
}

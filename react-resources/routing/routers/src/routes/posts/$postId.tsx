import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ params }) => {
    console.log(params.postId);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.postId}`,
    );
    console.log(res);
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

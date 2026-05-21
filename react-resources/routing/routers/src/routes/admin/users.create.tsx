import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <form>
        <span> User Create page</span>
        <input placeholder="name" />
      </form>
    </div>
  );
}

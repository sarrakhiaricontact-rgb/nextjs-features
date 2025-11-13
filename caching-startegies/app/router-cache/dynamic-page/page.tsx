// Forces the page to render dynamically on the server at request time
export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <div>
      <h1 className="font-bold text-4xl">
        Client-side Router Cache - Dynamic page
      </h1>
      <div className="mt-6">
        This page is dynamically rendered in{" "}
        <span className="text-blue-400">run time</span>.
      </div>
      <div className="flex flex-col gap-10 mt-10 border rounded border-zinc-900 p-10">
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio earum
          sint iure ipsa perspiciatis dicta. Facilis, velit.
        </div>
      </div>
    </div>
  );
}

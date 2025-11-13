export default function Page() {
  return (
    <div>
      <h1 className="font-bold text-4xl">
        Client-side Router Cache - Static page
      </h1>
      <div className="mt-6">
        This page is statically rendered in{" "}
        <span className="text-blue-400">build time</span>.
      </div>
      <div className="flex flex-col gap-10 mt-10 border rounded border-zinc-900 p-10">
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur ad,
          libero mollitia atque dicta, dolore hic, esse accusantium. Vel, optio.
        </div>
      </div>
    </div>
  );
}

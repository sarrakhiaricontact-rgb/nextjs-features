import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <h1 className="font-bold text-4xl">Client-side Router Cache</h1>

      <div className="flex flex-col gap-10 mt-10 border rounded border-zinc-900 p-10">
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque iste
          quo facere eaque illo consectetur dignissimos id consequuntur natus,
          laboriosam libero, mollitia delectus. Ea odit est adipisci, in
          recusandae debitis!
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href="/router-cache/static-page"
            className="border border-zinc-800 p-3 rounded cursor-pointer hover:bg-zinc-900"
          >
            Go to static page
          </Link>

          <Link
            href="/router-cache/dynamic-page"
            className="border border-zinc-800 p-3 rounded cursor-pointer hover:bg-zinc-900"
          >
            Go to dynamic page
          </Link>
        </div>
      </div>
    </div>
  );
}

import { api, HydrateClient } from "~/trpc/server";
import BellButton from "./_components/BellButton";
import Link from "next/link";

const routes = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/comments",
    label: "Comments",
  },
  {
    path: "/chats",
    label: "Chats",
  },
  {
    path: "/workplace",
    label: "Workplace",
  },
];
export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <header className="fixed left-0 top-0 w-full bg-gradient-to-r from-gray-900 to-gray-600 text-white shadow-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
            {/* Left side - Logo */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold sm:text-xl md:text-2xl">
                NW
              </span>
            </div>

            {/* Center - Navigation */}
            <nav className="hidden items-center gap-6 md:flex">
              {routes.map(({ path, label }) => (
                <Link
                  key={path}
                  href={path}
                  className="text-sm font-medium hover:text-gray-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <BellButton />
          </div>
        </header>

        <div className="flex w-full flex-grow flex-col items-center justify-center pt-20">
          <p>Hello</p>
        </div>
      </main>
    </HydrateClient>
  );
}

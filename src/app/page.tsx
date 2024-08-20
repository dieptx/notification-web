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
  return (
    <div className="flex w-full flex-grow flex-col items-center justify-center pt-20">
      <p>Hello! This is home page</p>
    </div>
  );
}

import type { Route } from "./+types/home";
import { WorldClock } from "../components/WorldClock";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "World Clock - Global Time Monitoring System" },
    { name: "description", content: "Retro-futuristic world clock with timezone monitoring" },
  ];
}

export default function Home() {
  return <WorldClock />;
}

import Hero from "@/components/Hero";
import HeroList from "@/components/HeroList";
import { getHeroes } from "@/services/heroService";

export default async function Home() {
  const heroes = await getHeroes();

  return (
    <div className="flex flex-col min-h-[calc(100vh-81px)]">
      {/* HERO */}
      <Hero />
      {/* CONTENT */}
      <HeroList heroes={heroes} />
    </div>
  );
}

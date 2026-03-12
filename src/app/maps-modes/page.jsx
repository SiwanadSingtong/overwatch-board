import { getGameModes, getMaps } from "@/services/mapsGameModesService";
import GameModesSection from "@/components/ui/GameModesSection";
import MapsSection from "@/components/ui/MapsSection";
import Image from "next/image";

export const metadata = {
  title: "Maps & Modes | Overwatch Board",
};

export default async function MapsAndModesPage() {
  const [gameModes, maps] = await Promise.all([getGameModes(), getMaps()]);

  return (
    <main className="min-h-screen bg-primary text-white py-12 px-4 md:px-12 lg:px-24 xl:px-48">
      <GameModesSection gameModes={gameModes} />

      {/* MAPS */}
      <MapsSection maps={maps} />
    </main>
  );
}

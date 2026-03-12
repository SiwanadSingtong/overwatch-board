"use client";

import { Map } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const COLS = 4;
const INITIAL_ROWS = 3;
const INITIAL_COUNT = COLS * INITIAL_ROWS;

export default function MapsSection({ maps }) {
  const [showAll, setShowAll] = useState(false);
  const [activeMode, setActiveMode] = useState("all");

  // Collect unique gamemodes across all maps
  const gamemodes = useMemo(() => {
    const set = new Set();
    maps.forEach((m) => m.gamemodes?.forEach((gm) => set.add(gm)));
    return ["all", ...Array.from(set).sort()];
  }, [maps]);

  const filtered = useMemo(() => {
    if (activeMode === "all") return maps;
    return maps.filter((m) => m.gamemodes?.includes(activeMode));
  }, [maps, activeMode]);

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  const handleTabChange = (mode) => {
    setActiveMode(mode);
    setShowAll(false);
  };

  return (
    <section>
      {/* Header + Tabs */}
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="uppercase italic font-bold text-3xl flex gap-2 items-center border-l-3 pl-2 border-accent">
          Maps
          <Map size={36} className="text-accent" />
        </h2>
        <div className="flex flex-wrap gap-1 bg-white/5 rounded-lg p-1">
          {gamemodes.map((gm) => (
            <button
              key={gm}
              onClick={() => handleTabChange(gm)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase transition-colors duration-200 cursor-pointer ${
                activeMode === gm
                  ? "bg-accent text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {gm === "all" ? "All" : gm}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayed.map((map) => (
          <div
            key={map.key}
            className="relative rounded-xl overflow-hidden group aspect-video"
          >
            {map.screenshot && (
              <Image
                src={map.screenshot}
                alt={map.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />

            {/* Name always visible */}
            <div className="absolute inset-x-0 bottom-0 p-3 transition-opacity duration-300 group-hover:opacity-0">
              <p className="font-bold text-base">{map.name}</p>
            </div>

            {/* Detail panel slides up on hover */}
            <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-bold text-accent text-base">{map.name}</p>
              {map.location && (
                <p className="text-white/70 text-xs">{map.location}</p>
              )}
              {map.gamemodes?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {map.gamemodes.map((gm) => (
                    <span
                      key={gm}
                      className="text-[10px] uppercase bg-accent/30 text-accent px-2 py-0.5 rounded-full font-semibold"
                    >
                      {gm}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!showAll && filtered.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2.5 border border-accent text-accent rounded-full text-sm font-semibold hover:bg-accent hover:text-white transition-colors duration-200 cursor-pointer"
          >
            See all {filtered.length} maps
          </button>
        </div>
      )}
    </section>
  );
}


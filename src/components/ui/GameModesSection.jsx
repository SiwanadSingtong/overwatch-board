"use client";

import { Button } from "@mui/material";
import { Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function GameModesSection({ gameModes }) {
  const [tab, setTab] = useState("random");
  const [randomModes, setRandomModes] = useState(gameModes.slice(0, 4));

  // Randomize only on client after mount to avoid hydration mismatch
  useEffect(() => {
    const shuffled = [...gameModes].sort(() => Math.random() - 0.5);
    setRandomModes(shuffled.slice(0, 4));
  }, [gameModes]);

  const displayed = tab === "random" ? randomModes : gameModes;

  const tabs = [
    { key: "random", label: "Featured" },
    { key: "all", label: "All Modes" },
  ];

  return (
    <section className="mb-16">
      {/* Header + Tabs */}
      <div className="flex flex-col mb-6">
        <h2 className="uppercase italic font-bold text-3xl text-white flex gap-2 items-center">
          Game Modes
          <Gamepad2 size={36} className="text-accent" />
        </h2>
        <p className="text-white/50 my-2">
          Master every corner of the globe. From the futuristic streets of Busan
          to the historic alleys of King's Row.
        </p>
        <div className="flex gap-1 rounded-lg p-1">
          {tabs.map((t) => (
            <Button
              variant="contained"
              size="small"
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-md! text-sm! font-semibold! transition-colors duration-200 cursor-pointer shadow-none! ${
                tab === t.key
                  ? "bg-accent! text-white"
                  : "text-white/50! hover:text-white bg-transparent!"
              }`}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
        {displayed.map((mode) => (
          <div
            key={mode.key}
            className="border border-accent/20 p-4 rounded-md flex flex-col gap-3"
          >
            {mode.icon && (
              <div
                className="w-8 h-8 bg-accent shrink-0"
                style={{
                  maskImage: `url(${mode.icon})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: `url(${mode.icon})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
            )}
            <h3 className="text-lg uppercase italic font-semibold">
              {mode.name}
            </h3>
            <p className="text-white/50 text-sm flex-1">{mode.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

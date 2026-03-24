"use client";

import React, { useState } from "react";
import HeroCard from "@/components/ui/HeroCard";
import { Button } from "@mui/material";
import { Syringe, Swords, Shield, Users } from "lucide-react";

export default function HeroList({ heroes }) {
  const [filter, setFilter] = useState("all");

  const tanks = heroes.filter((h) => h.role === "tank");
  const damage = heroes.filter((h) => h.role === "damage");
  const support = heroes.filter((h) => h.role === "support");

  const getButtonClass = (role) => {
    return filter === role
      ? "bg-accent! rounded-full! text-black! py-3! px-6! text-sm! tracking-wider font-semibold! gap-2"
      : "bg-second! hover:bg-accent/10! transition-colors duration-100 rounded-full! text-white! hover:text-accent! py-3! px-6! text-sm! tracking-wider font-semibold! gap-2";
  };

  return (
    <div className="px-4 md:px-12 lg:px-24 xl:px-48 flex flex-col gap-12">
      {/* FILTER */}
      <div className="flex flex-col md:flex-row gap-6 border-b pb-4 border-accent">
        {/* All Roles */}
        <Button
          onClick={() => setFilter("all")}
          variant="contained"
          className={getButtonClass("all")}
        >
          <Users size={14} />
          all roles
        </Button>
        {/* Tank */}
        <Button
          onClick={() => setFilter("tank")}
          variant="contained"
          className={getButtonClass("tank")}
        >
          <Shield size={14} />
          tank
        </Button>
        {/* Damage */}
        <Button
          onClick={() => setFilter("damage")}
          variant="contained"
          className={getButtonClass("damage")}
        >
          <Swords size={14} />
          damage
        </Button>
        {/* Support */}
        <Button
          onClick={() => setFilter("support")}
          variant="contained"
          className={getButtonClass("support")}
        >
          <Syringe size={14} />
          support
        </Button>
      </div>

      {/* HEROES LIST */}
      <div className="flex flex-col gap-12 pb-16">
        {/* TANK */}
        {(filter === "all" || filter === "tank") && (
          <div className="flex flex-col gap-6">
            <p className="flex gap-4 items-center text-white uppercase italic text-3xl font-semibold">
              <Shield size={32} className="text-accent" />
              tank heroes
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {tanks.map((hero) => (
                <HeroCard key={hero.key} hero={hero} />
              ))}
            </div>
          </div>
        )}

        {/* DAMAGE */}
        {(filter === "all" || filter === "damage") && (
          <div className="flex flex-col gap-6">
            <p className="flex gap-4 items-center text-white uppercase italic text-3xl font-semibold">
              <Swords size={32} className="text-accent" />
              damage heroes
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {damage.map((hero) => (
                <HeroCard key={hero.key} hero={hero} />
              ))}
            </div>
          </div>
        )}

        {/* SUPPORT */}
        {(filter === "all" || filter === "support") && (
          <div className="flex flex-col gap-6">
            <p className="flex gap-4 items-center text-white uppercase italic text-3xl font-semibold">
              <Syringe size={32} className="text-accent" />
              support heroes
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {support.map((hero) => (
                <HeroCard key={hero.key} hero={hero} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

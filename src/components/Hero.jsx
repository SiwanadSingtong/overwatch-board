import { Button } from "@mui/material";
import { CirclePlayIcon } from "lucide-react";
import React from "react";

function Hero() {
  return (
    <section
      id="hero"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 40%, rgba(33,25,16,1) 100%), url('/hero-banner.jpg')",
      }}
      className="w-full bg-cover bg-no-repeat bg-top h-[calc(70vh)] flex items-end pb-12 px-4 md:px-12 lg:px-24 xl:px-48"
    >
      <div className="flex flex-col gap-6 text-white">
        {/* INFO */}
        <h2 className="text-5xl md:text-7xl font-bold uppercase italic">
          Choose Your <span className="text-accent">hero</span>
        </h2>
        <p className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] font-semibold text-lg">
          A world needs heroes. Join the fight with a diverse cast of soldiers,
          scientists, adventurers, and oddities. Every hero has a story, and a
          role to play.
        </p>
        <Button
          variant="contained"
          className="bg-accent! hover:bg-accent/90! transition-colors duration-100 flex *:text-black w-fit gap-2 font-semibold! py-3! px-6!"
        >
          <CirclePlayIcon />
          <p className="">watch trailer</p>
        </Button>
      </div>
    </section>
  );
}

export default Hero;

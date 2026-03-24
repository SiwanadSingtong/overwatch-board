"use client";

import { Button, Dialog, DialogContent, CircularProgress, IconButton } from "@mui/material";
import { CirclePlayIcon, X } from "lucide-react";
import React, { useState } from "react";

function Hero() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setLoading(true);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
          onClick={handleOpen}
        >
          <CirclePlayIcon />
          <p className="">watch trailer</p>
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            position: "relative",
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
            top: -48,
            color: "white",
            zIndex: 10,
          }}
        >
          <X size={32} />
        </IconButton>
        <DialogContent
          sx={{
            p: 0,
            overflow: "hidden",
            position: "relative",
            aspectRatio: "16/9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
            borderRadius: "8px",
          }}
        >
          {loading && (
            <CircularProgress color="inherit" sx={{ color: "white", position: "absolute" }} />
          )}
          {open && (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/LGgqyer-qr4?autoplay=1"
              title="Overwatch Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setLoading(false)}
              style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s" }}
            ></iframe>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default Hero;

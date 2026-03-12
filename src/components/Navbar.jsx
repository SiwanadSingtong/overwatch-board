"use client";

import { Box, InputAdornment, TextField } from "@mui/material";
import { SearchIcon } from "lucide-react";
import { BoxIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const menu = [
  {
    title: "heroes",
    link: "/",
  },
//   {
//     title: "game modes",
//     link: "/game-modes",
//   },
  {
    title: "maps & modes",
    link: "/maps-modes",
  },
//   {
//     title: "players",
//     link: "/players",
//   },
];

function Navbar() {
  const pathname = usePathname();
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <nav className="bg-primary py-4 px-6 flex justify-between border-b border-accent/20">
      {/* LOGO AND MENU */}
      <div className="flex gap-8">
        {/* LOGO */}
        <Link href="/" className="flex gap-2 items-center text-accent">
          <BoxIcon size={36} />
          <h1 className="uppercase tracking-tight font-bold text-2xl">
            overwatch
          </h1>
        </Link>
        {/* MENU */}
        <ul className="hidden md:flex justify-between gap-8 items-center text-md tracking-wider text-white/80 uppercase">
          {menu.map((m) => (
            <li key={m.link}>
              <Link
                href={m.link}
                className={pathname === m.link ? "text-white" : ""}
              >
                {m.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* SEARCH AND PLAY NOW BUTTON */}
      <div className="flex gap-4 items-center">
        {/* SEARCH */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#1e293b",
            borderRadius: 3,
            px: 1.5,
            height: 48,
            outline: searchFocused
              ? "2px solid #ee8c2b"
              : "2px solid transparent",
            transition: "outline-color 0.2s",
          }}
          className="hidden! lg:flex!"
        >
          <SearchIcon
            size={20}
            color={searchFocused ? "#ee8c2b" : "white"}
            style={{ marginRight: "12px", transition: "color 0.2s" }}
          />
          <TextField
            placeholder="Search Hero..."
            variant="standard"
            fullWidth
            size="small"
            InputProps={{
              disableUnderline: true,
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            sx={{
              "& input::placeholder": {
                color: "white",
                opacity: 0.6,
                fontSize: 14,
              },
              "& input": {
                color: "white",
                padding: 0,
                margin: 0,
              },
            }}
          />
        </Box>
        {/* PLAY NOW BUTTON */}
        <Link
          href="https://overwatch.blizzard.com/"
          target="_blank"
          className="bg-accent hover:bg-accent/90 transition-colors duration-100 py-2 px-4 rounded-lg font-semibold uppercase"
        >
          play now
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

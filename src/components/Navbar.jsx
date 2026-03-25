"use client";

import { Box, TextField } from "@mui/material";
import { BoxIcon, MenuIcon, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { getHeroes } from "@/services/heroService";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    if (pathname === "/" && heroes.length === 0) {
      getHeroes().then((data) => setHeroes(data)).catch(console.error);
    }
  }, [pathname, heroes.length]);

  const filteredHeroes = searchQuery
    ? heroes
        .filter((h) => {
           const name = h.name || h.key || "";
           return name.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .slice(0, 5)
    : [];

  return (
    <>
      <nav className="bg-primary py-4 px-6 flex justify-between border-b border-accent/20 relative z-50">
        {/* LOGO AND MENU */}
        <div className="flex gap-8">
          {/* LOGO */}
          <Link href="/" className="flex gap-2 items-center text-accent">
            <BoxIcon size={36} />
            <h1 className="uppercase tracking-tight font-bold text-2xl">
              overwatch
            </h1>
          </Link>
          {/* MENU — desktop only (lg+) */}
          <ul className="hidden lg:flex justify-between gap-8 items-center text-md tracking-wider text-white/80 uppercase">
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

        {/* RIGHT SECTION */}
        <div className="flex gap-4 items-center">
          {/* SEARCH — lg+ only - Show only on hero page (/) */}
          {pathname === "/" && (
            <Box
            sx={{
              position: "relative",
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
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                window.dispatchEvent(
                  new CustomEvent("search-hero", { detail: val })
                );
              }}
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

            {/* SEARCH SUGGESTIONS */}
            {searchFocused && searchQuery && filteredHeroes.length > 0 && (
              <div 
                className="absolute top-full left-0 right-0 mt-3 bg-primary border border-accent/20 rounded-lg shadow-xl overflow-hidden z-50 flex flex-col"
                onMouseDown={(e) => e.preventDefault()} // Keep focus on input when clicking dropdown
              >
                {filteredHeroes.map((hero) => (
                  <Link
                    key={hero.key}
                    href={`/heroes/${hero.key}`}
                    className="flex items-center gap-3 p-3 hover:bg-second transition-colors cursor-pointer"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchFocused(false);
                      // Give the input time to unfocus if needed, or dispatch empty search
                      window.dispatchEvent(new CustomEvent("search-hero", { detail: "" }));
                    }}
                  >
                    <div className="relative w-8 h-8 rounded shrink-0 overflow-hidden bg-white/10">
                      <Image
                        src={hero.portrait}
                        alt={hero.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="text-white text-sm font-semibold uppercase truncate">
                      {hero.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
            </Box>
          )}

          {/* PLAY NOW BUTTON — md+ only */}
          <Link
            href="https://overwatch.blizzard.com/"
            target="_blank"
            className="hidden md:block bg-accent hover:bg-accent/90 transition-colors duration-100 py-2 px-4 rounded-lg font-semibold uppercase"
          >
            play now
          </Link>

          {/* BURGER BAR — below lg only */}
          <button
            className="lg:hidden flex items-center justify-center text-white cursor-pointer"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon size={28} />
          </button>
        </div>
      </nav>

      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* SLIDING DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-primary z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* CLOSE BUTTON */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white cursor-pointer"
            aria-label="Close menu"
          >
            <XIcon size={28} />
          </button>
        </div>

        {/* DRAWER MENU ITEMS */}
        <ul className="flex flex-col gap-6 px-6 pt-2 text-white/80 uppercase tracking-wider text-lg">
          {menu.map((m) => (
            <li key={m.link}>
              <Link
                href={m.link}
                onClick={() => setMenuOpen(false)}
                className={`block hover:text-accent transition-colors ${pathname === m.link ? "text-accent font-semibold" : ""
                  }`}
              >
                {m.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* PLAY NOW IN DRAWER — sm only */}
        <div className="px-6 pt-8 md:hidden">
          <Link
            href="https://overwatch.blizzard.com/"
            target="_blank"
            onClick={() => setMenuOpen(false)}
            className="block text-center bg-accent hover:bg-accent/90 transition-colors duration-100 py-2 px-4 rounded-lg font-semibold uppercase"
          >
            play now
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;

"use client";

import Image from "next/image";
import { useRef } from "react";

export default function AbilityCard({ item }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    // Wait for any pending play() to settle before pausing
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          video.pause();
          video.currentTime = 0;
        })
        .catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div
      key={item.name}
      className="bg-accent/0.5 border border-accent/40 rounded-lg p-4 flex flex-col gap-4 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon */}
      <div className="border-b pb-4 border-accent/30 flex flex-col gap-3">
        <div className="flex h-12 justify-between items-center">
          <Image
            src={item.icon}
            alt={item.name}
            width={48}
            height={48}
            className="object-contain"
          />
          <p className="text-xl uppercase font-semibold">{item.name}</p>
        </div>

        {/* Video + Thumbnail — shown below icon */}
        {item.video?.link?.webm && (
          <div className="relative w-full rounded-md overflow-hidden">
            {/* Thumbnail — visible when not hovering */}
            {item.video.thumbnail && (
              <img
                src={item.video.thumbnail}
                alt={item.name}
                className="w-full max-h-40 object-cover group-hover:opacity-0 transition-opacity duration-200"
              />
            )}
            {/* Video — overlays thumbnail on hover */}
            <video
              ref={videoRef}
              src={item.video.link.webm}
              muted
              loop
              playsInline
              className={`w-full max-h-40 object-cover transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${
                item.video.thumbnail ? "absolute inset-0 h-full" : ""
              }`}
            />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
        <p className="text-xl uppercase font-semibold">{item.name}</p>
        <p className="text-lg tracking-wide text-white/80">{item.description}</p>
      </div>
    </div>
  );
}

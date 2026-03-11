import Image from "next/image";
import Link from "next/link";

function HeroCard({ hero }) {
  return (
    <Link
      href={`/heroes/${hero.key}`}
      className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-full aspect-square">
        <Image
          src={hero.portrait}
          alt={hero.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 16vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white font-semibold text-sm tracking-wide uppercase truncate">
          {hero.name}
        </p>
      </div>
    </Link>
  );
}

export default HeroCard;

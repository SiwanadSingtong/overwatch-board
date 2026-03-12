import { getHeroByKey, getHeroStats } from "@/services/heroService";
import AbilityCard from "@/components/ui/AbilityCard";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { hero: heroKey } = await params;
  try {
    const hero = await getHeroByKey(heroKey);
    return { title: `${hero.name} | Overwatch Board` };
  } catch {
    return { title: "Hero Not Found" };
  }
}

export default async function HeroDetailPage({ params }) {
  const { hero: heroKey } = await params;

  let hero;
  try {
    hero = await getHeroByKey(heroKey);
  } catch {
    notFound();
  }

  let heroStats = null;
  try {
    const allStats = await getHeroStats();
    heroStats = allStats.find((s) => s.hero === heroKey) ?? null;
  } catch {
    // stats are non-critical, continue without them
  }

  const chapters = hero.story?.chapters ?? [];
  const randomChapter = chapters.length
    ? chapters[Math.floor(Math.random() * chapters.length)]
    : null;

  return (
    <main className="min-h-screen bg-primary text-white">
      {/* Banner */}
      <div className="relative w-full h-[calc(80vh)] md:h-[calc(80vh)]">
        {randomChapter?.picture && (
          <Image
            src={randomChapter.picture}
            alt={hero.name}
            fill
            className="object-cover object-top"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-primary" />
        <div className="absolute bottom-6 left-4 md:left-12 lg:left-24 xl:left-48 flex flex-col gap-3">
          <p className="bg-accent text-white w-fit rounded-full py-2 px-4 uppercase text-xs tracking-widest font-semibold">
            {hero.role}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase">
            {hero.name}
          </h1>
          <p className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] font-semibold text-lg">
            {hero.description}
          </p>
        </div>
      </div>

      {/* SHORT DETAILS */}
      <div className="border-y border-accent/50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-accent/50 *:flex *:flex-col *:items-center *:py-8">
        {/* AGE */}
        <div>
          <p className="text-lg text-white/70 uppercase font-semibold">age</p>
          <p className="text-2xl tracking-wider font-bold">{hero.age}</p>
        </div>
        {/* LOCATION */}
        <div>
          <p className="text-lg text-white/70 uppercase font-semibold">
            Base of Ops
          </p>
          <p className="text-2xl tracking-wider font-bold text-center line-clamp-1">
            {hero.location}
          </p>
        </div>
        {/* PICK RATE */}
        <div>
          <p className="text-lg text-white/70 uppercase font-semibold">
            pick rate
          </p>
          <p className="text-2xl tracking-wider font-bold text-center">
            {heroStats.pickrate}%
          </p>
        </div>
        {/* WIN RATE */}
        <div>
          <p className="text-lg text-white/70 uppercase font-semibold">
            win rate
          </p>
          <p className="text-2xl tracking-wider font-bold text-center">
            {heroStats.winrate}%
          </p>
        </div>
      </div>

      {/* DETAIL */}
      <div className="py-12 px-4 md:px-12 lg:px-24 xl:px-48 flex flex-col md:flex-row gap-4">
        {/* LORE */}
        <div className="w-full md:w-1/3">
          <h3 className="uppercase italic text-accent font-bold text-3xl mb-3">
            the lore
          </h3>
          <div className="flex flex-row md:flex-col gap-2">
            <div className="flex justify-between items-start">
              <div className="relative w-40 h-40">
                <Image
                  src={hero.portrait}
                  fill
                  alt={hero.name}
                  className="object-contain"
                />
              </div>
              <div className="bg-accent/20 text-accent font-semibold h-fit p-2 rounded-lg hidden lg:block">
                <p className="uppercase text-white">birthday</p>
                <p>{hero.birthday}</p>
              </div>
            </div>
            <p className="text-white/80 text-md">{hero.story.summary}</p>
          </div>
        </div>
        {/* ABILITIES */}
        <div className="w-full md:w-2/3">
          <h3 className="uppercase italic text-accent font-bold text-3xl mb-3">
            abilities
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {hero.abilities?.map((item) => (
              <AbilityCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* STORY */}
      <div className="py-12 px-4 md:px-12 lg:px-24 xl:px-48">
        <div className="relative flex items-center justify-center mb-6">
          <h3 className="uppercase italic font-bold text-3xl text-center text-accent">
            story
          </h3>
          <Link
            href={hero.story.media.link}
            target="_blank"
            className="absolute right-0 bg-accent rounded-md p-2 text-black font-extrabold text-xs tracking-wider uppercase italic hover:scale-105 transition-all"
          >
            See {hero.story.media.type}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hero.story.chapters.map((item) => (
            <div
              key={item.title}
              className="relative aspect-video rounded-xl overflow-hidden group"
            >
              <Image
                alt={item.title}
                src={item.picture}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />

              {/* Title — visible by default, fades out on hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 transition-opacity duration-300 group-hover:opacity-0">
                <p className="text-white font-bold text-lg leading-snug line-clamp-2">
                  {item.title}
                </p>
              </div>

              {/* Detail panel — slides up from bottom on hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-accent font-bold text-lg leading-snug">
                  {item.title}
                </p>
                {item.content && (
                  <p className="text-white/80 text-sm line-clamp-4">
                    {item.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

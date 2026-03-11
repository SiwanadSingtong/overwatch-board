import { getHeroByKey, getHeroStats } from "@/services/heroService";
import Image from "next/image";
import { notFound } from "next/navigation";

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
      <div className="py-12 px-4 md:px-12 lg:px-24 xl:px-48 flex gap-4">
        {/* LORE */}
        <div className="w-1/3">
          <h3 className="uppercase italic text-accent font-bold text-3xl">
            the lore
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <Image
                src={hero.portrait}
                width={180}
                height={180}
                alt={hero.name}
              />
              <div className="bg-accent/20 text-accent font-semibold h-fit p-2 rounded-lg hidden lg:block">
                <p className="uppercase text-white">birthday</p>
                <p>{hero.birthday}</p>
              </div>
            </div>
            <p className="text-white/80 text-md">{hero.story.summary}</p>
          </div>
        </div>
        {/* ABILITIES */}
        <div className="w-2/3">
          <h3 className="uppercase italic text-accent font-bold text-3xl">
            abilities
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {hero.abilities?.map((item) => (
              <div
                key={item.name}
                className="bg-accent/0.5 border border-accent/40 rounded-lg p-4 flex flex-col gap-4"
              >
                {/* Icon */}
                <div className="border-b pb-4 border-accent/30">
                  <div className="relative w-12 h-12">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                {/* DETAILS */}
                <div className="flex flex-col gap-2">
                  <p className="text-xl uppercase font-semibold">{item.name}</p>
                  <p className="text-lg tracking-wide text-white/80">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

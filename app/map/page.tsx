import AppShell from "@/app/components/AppShell";
import MemoryMap from "@/app/components/MemoryMap";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function MapPage() {
  const people = await prisma.person.findMany({
    where: {
      birthLat: { not: null },
      birthLng: { not: null },
    },
    select: {
      id: true,
      name: true,
      birthPlace: true,
      birthLat: true,
      birthLng: true,
      fatherId: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-7">
          <p className="text-sm uppercase text-yellow-100/55">Leaflet</p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">Карта памяти</h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/62">
            География семьи: места рождения, важные города и будущие маршруты миграции поколений.
          </p>
        </div>
        <MemoryMap people={people} />
      </main>
    </AppShell>
  );
}

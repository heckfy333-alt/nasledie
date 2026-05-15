import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AppShell from "@/app/components/AppShell";

export const dynamic = "force-dynamic";

export default async function PeoplePage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q?.trim();
  const people = await prisma.person.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { birthPlace: { contains: query, mode: "insensitive" } },
            { biography: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 60,
  });

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm uppercase text-yellow-100/55">Люди и мемориалы</p>
            <h1 className="mt-2 text-4xl font-black sm:text-5xl">Семейная память</h1>
            <p className="mt-4 max-w-2xl leading-7 text-white/62">
              Каталог страниц близких с биографиями, событиями, архивами и семейными связями.
            </p>
          </div>
          <form className="flex w-full gap-2 lg:w-[420px]">
            <input
              name="q"
              defaultValue={query}
              placeholder="Поиск по имени, месту, истории"
              className="min-h-11 flex-1 rounded-lg border border-white/12 bg-white/7 px-4 text-white outline-none placeholder:text-white/36 focus:border-yellow-200/45"
            />
            <button className="premium-button px-5" type="submit">
              Найти
            </button>
          </form>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <Link key={person.id} href={`/person/${person.id}`} className="glass group rounded-xl p-4">
              <div
                className="h-56 rounded-lg border border-white/10 bg-cover bg-center transition group-hover:scale-[1.01]"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(0,0,0,.72), rgba(0,0,0,.05)), url(${person.photo || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop"})`,
                }}
              />
              <div className="pt-5">
                <p className="text-xs uppercase text-yellow-100/55">{person.role || "Страница памяти"}</p>
                <h2 className="mt-1 text-2xl font-bold">{person.name}</h2>
                <p className="mt-2 text-sm text-white/52">
                  {[person.birthPlace, person.deathPlace].filter(Boolean).join(" - ") || "Места пока не указаны"}
                </p>
                <p className="mt-4 line-clamp-3 leading-7 text-white/64">
                  {person.biography || person.bio || "Биография ждёт семейных воспоминаний."}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {people.length === 0 && (
          <div className="glass rounded-xl p-10 text-center text-white/64">
            Пока нет страниц. Создайте первый мемориал, чтобы начать семейный архив.
          </div>
        )}
      </main>
    </AppShell>
  );
}

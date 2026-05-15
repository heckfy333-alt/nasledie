import AppShell from "@/app/components/AppShell";
import TreeClient from "@/app/tree/tree-client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function TreePage() {
  const people = await prisma.person.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      photo: true,
      birthPlace: true,
      fatherId: true,
      motherId: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-7">
          <p className="text-sm uppercase text-yellow-100/55">Родовая линия</p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">Семейное древо</h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/62">
            Предки расположены сверху, дети ниже, а золотые пунктирные ветви показывают связь от родителей к потомкам.
          </p>
        </div>
        <TreeClient people={people} />
      </main>
    </AppShell>
  );
}

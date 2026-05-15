import Link from "next/link";
import { notFound } from "next/navigation";
import QRCode from "react-qr-code";
import { Archive, CalendarDays, Flame, MapPinned, MessageCircle, Mic2 } from "lucide-react";

import AppShell from "@/app/components/AppShell";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = await prisma.person.findUnique({
    where: { id: Number(id) },
    select: { name: true, biography: true, bio: true },
  });

  if (!person) {
    return { title: "Мемориал не найден" };
  }

  return {
    title: person.name,
    description: person.biography || person.bio || `Страница памяти ${person.name} на платформе Наследие.`,
  };
}

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = await prisma.person.findUnique({
    where: { id: Number(id) },
    include: {
      events: { orderBy: [{ happenedAt: "asc" }, { createdAt: "asc" }] },
      memories: { orderBy: { createdAt: "desc" } },
      comments: { orderBy: { createdAt: "desc" } },
      candles: { orderBy: { createdAt: "desc" } },
      photos: { orderBy: { createdAt: "desc" } },
      voiceMemories: { orderBy: { createdAt: "desc" } },
      documents: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!person) {
    notFound();
  }

  const qrUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/person/${person.id}`;

  return (
    <AppShell>
      <main>
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage: `url(${person.photo || "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=2200&auto=format&fit=crop"})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/62 via-black/74 to-[#050507]" />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
            <div className="flex min-h-[440px] flex-col justify-end">
              <p className="text-sm uppercase text-yellow-100/62">{person.role || "Страница памяти"}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight sm:text-7xl">{person.name}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
                {person.biography || person.bio || "Семья ещё собирает историю жизни этого человека."}
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/62">
                <span className="rounded-full border border-white/12 bg-white/7 px-4 py-2">
                  {person.birthPlace || "Место рождения не указано"}
                </span>
                <span className="rounded-full border border-white/12 bg-white/7 px-4 py-2">
                  {person.events.length} событий
                </span>
                <span className="rounded-full border border-white/12 bg-white/7 px-4 py-2">
                  {person.candles.length} свечей
                </span>
              </div>
            </div>

            <aside className="glass h-fit rounded-xl p-5">
              <div className="rounded-lg bg-white p-4">
                <QRCode value={qrUrl} className="h-full w-full" />
              </div>
              <p className="mt-4 text-sm leading-6 text-white/60">
                QR-мемориал можно разместить в семейной книге, на памятном месте или в архивной папке.
              </p>
              <Link href={`/api/person/${person.id}`} className="ghost-button mt-4 w-full px-4">
                API карточки
              </Link>
            </aside>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-5">
            <Panel icon={CalendarDays} title="События жизни">
              <div className="space-y-3">
                {person.events.map((event) => (
                  <div key={event.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-yellow-100/65">{event.year || event.happenedAt?.getFullYear() || "Дата уточняется"}</p>
                    <h3 className="mt-1 text-xl font-bold">{event.title}</h3>
                    <p className="mt-2 leading-7 text-white/62">{event.description}</p>
                  </div>
                ))}
                {person.events.length === 0 && <Empty text="События пока не добавлены." />}
              </div>
            </Panel>

            <Panel icon={Archive} title="Фото и документы">
              <div className="grid gap-3 sm:grid-cols-2">
                {person.photos.map((photo) => (
                  <div key={photo.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <img src={photo.imageUrl} alt={photo.title || person.name} className="h-52 w-full rounded-md object-cover" />
                    <p className="mt-3 text-sm text-white/58">{photo.title || "Семейная фотография"}</p>
                  </div>
                ))}
                {person.documents.map((document) => (
                  <a key={document.id} href={document.fileUrl} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="font-bold text-yellow-100">{document.title}</p>
                    <p className="mt-2 text-sm text-white/52">{document.fileType || "Документ архива"}</p>
                  </a>
                ))}
              </div>
              {person.photos.length + person.documents.length === 0 && <Empty text="Архив пока пуст." />}
            </Panel>
          </div>

          <div className="space-y-5">
            <Panel icon={Flame} title="Свечи памяти">
              <div className="space-y-3">
                {person.candles.slice(0, 8).map((candle) => (
                  <div key={candle.id} className="rounded-lg border border-yellow-100/15 bg-yellow-100/8 p-4">
                    <p className="font-bold">{candle.author}</p>
                    <p className="mt-1 text-sm leading-6 text-white/58">{candle.message || "Зажёг свечу памяти."}</p>
                  </div>
                ))}
                {person.candles.length === 0 && <Empty text="Станьте первым, кто зажжёт свечу." />}
              </div>
            </Panel>

            <Panel icon={Mic2} title="Голосовые воспоминания">
              <div className="space-y-3">
                {person.voiceMemories.map((voice) => (
                  <div key={voice.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="font-bold">{voice.title}</p>
                    <audio src={voice.audioUrl} controls className="mt-3 w-full" />
                  </div>
                ))}
                {person.voiceMemories.length === 0 && <Empty text="Голосовые истории пока не записаны." />}
              </div>
            </Panel>

            <Panel icon={MessageCircle} title="Комментарии семьи">
              <div className="space-y-3">
                {person.comments.slice(0, 6).map((comment) => (
                  <div key={comment.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="font-bold">{comment.author}</p>
                    <p className="mt-1 text-sm leading-6 text-white/62">{comment.text}</p>
                  </div>
                ))}
                {person.comments.length === 0 && <Empty text="Комментариев пока нет." />}
              </div>
            </Panel>

            <Panel icon={MapPinned} title="Места памяти">
              <p className="leading-7 text-white/62">
                {person.birthPlace || "Место рождения не указано"}
                {person.deathPlace ? ` - ${person.deathPlace}` : ""}
              </p>
            </Panel>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass rounded-xl p-5">
      <div className="mb-5 flex items-center gap-3">
        <Icon className="h-5 w-5 text-yellow-200" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/48">{text}</p>;
}

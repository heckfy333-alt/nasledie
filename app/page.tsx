import Link from "next/link";
import {
  Archive,
  AudioLines,
  Flame,
  GitBranch,
  MapPinned,
  QrCode,
  Sparkles,
} from "lucide-react";

import AppShell from "@/app/components/AppShell";

const features = [
  {
    title: "Семейное древо",
    text: "Визуальные связи поколений на ReactFlow с будущей поддержкой сложных родственных линий.",
    icon: GitBranch,
  },
  {
    title: "Карта памяти",
    text: "Места рождения, жизни и важных событий семьи на интерактивной карте Leaflet.",
    icon: MapPinned,
  },
  {
    title: "Архив",
    text: "Фотографии, документы, истории, комментарии и голосовые воспоминания в одном мемориале.",
    icon: Archive,
  },
  {
    title: "Свечи памяти",
    text: "Тёплый ритуал присутствия: родные могут оставить свечу, имя и короткое послание.",
    icon: Flame,
  },
  {
    title: "Голос семьи",
    text: "Основа для загрузки аудиоисторий и живых воспоминаний близких.",
    icon: AudioLines,
  },
  {
    title: "QR-мемориалы",
    text: "Каждая страница получает постоянный QR-идентификатор для памятных мест и семейных книг.",
    icon: QrCode,
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <main>
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2200&auto=format&fit=crop)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/58 via-black/70 to-[#050507]" />

          <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-yellow-200/24 bg-black/35 px-4 py-2 text-sm text-yellow-100/82 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Цифровая социальная сеть памяти для семьи
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-[1.02] sm:text-7xl lg:text-8xl">
                <span className="gold-text">Наследие</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Создавайте страницы близких, храните фотографии, документы и голоса,
                стройте древо поколений и превращайте семейную историю в живой архив.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/people" className="premium-button px-6 py-3">
                  Открыть платформу
                </Link>
                <Link href="/tree" className="ghost-button px-6 py-3">
                  Смотреть древо
                </Link>
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="rounded-xl border border-white/10 bg-black/35 p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase text-white/42">Мемориал</p>
                    <h2 className="mt-1 text-2xl font-bold">Анна Петровна Орлова</h2>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-lg bg-yellow-200/12 text-yellow-100">
                    <Flame className="h-7 w-7" />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {["1928", "17 событий", "42 фото"].map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <p className="text-lg font-bold text-yellow-100">{item}</p>
                      <p className="mt-1 text-xs text-white/45">сохранено</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    "Родилась в Самаре, всю жизнь собирала семейные письма.",
                    "В архив добавлена голосовая история от внучки.",
                    "Зажжены 8 свечей памяти за последнюю неделю.",
                  ].map((item) => (
                    <div key={item} className="rounded-lg bg-white/5 p-4 text-sm leading-6 text-white/68">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="glass rounded-xl p-6">
                  <Icon className="h-7 w-7 text-yellow-200" />
                  <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-white/62">{feature.text}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </AppShell>
  );
}

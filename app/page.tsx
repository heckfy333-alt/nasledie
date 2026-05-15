import Link from "next/link";
import {
  Archive,
  ArrowRight,
  BookOpen,
  Flame,
  Heart,
  ImageIcon,
  Landmark,
  MapPin,
  Search,
  TreePine,
  UserRound,
  Users,
} from "lucide-react";

const stats = [
  { value: "125 742", label: "семейных древ", icon: TreePine },
  { value: "1 357 892", label: "человека в базе", icon: UserRound },
  { value: "4 892", label: "кладбища на карте", icon: Landmark },
  { value: "8 764 112", label: "фотографий и документов", icon: ImageIcon },
  { value: "2 358 947", label: "воспоминаний", icon: Flame },
];

const cards = [
  {
    title: "Древо рода",
    text: "Интерактивное дерево вашей семьи от первых поколений до потомков.",
    href: "/tree",
    action: "Перейти",
    icon: TreePine,
    visual: "tree",
  },
  {
    title: "Память о людях",
    text: "Страницы памяти с биографиями, фотографиями и историями жизни.",
    href: "/people",
    action: "Смотреть",
    icon: UserRound,
    visual: "portrait",
  },
  {
    title: "Карта памяти",
    text: "Найдите места рождения, жизни и захоронений родных на интерактивной карте.",
    href: "/map",
    action: "Открыть карту",
    icon: MapPin,
    visual: "map",
  },
  {
    title: "Семейные архивы",
    text: "Храните документы, фотографии, письма и видео вашей семьи.",
    href: "/documents",
    action: "Перейти в архив",
    icon: Archive,
    visual: "archive",
  },
];

const steps = [
  { title: "Создайте древо", text: "Добавьте семью и первых предков.", icon: TreePine },
  { title: "Заполняйте профили", text: "Добавляйте биографии, фото и документы.", icon: BookOpen },
  { title: "Указывайте места", text: "Отмечайте города и точки памяти на карте.", icon: MapPin },
  { title: "Приглашайте родных", text: "Делитесь историями своей семьи.", icon: Users },
  { title: "Сохраняйте память", text: "Передавайте наследие будущим поколениям.", icon: Heart },
];

export default function HomePage() {
  return (
    <main className="heritage-page overflow-hidden">
      <section className="relative min-h-[760px] px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="heritage-stars absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_16%_22%,rgba(214,173,82,0.26),transparent_12rem),radial-gradient(circle_at_58%_14%,rgba(86,132,196,0.18),transparent_22rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#030303] to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="pt-10 lg:pt-20">
            <div className="mb-10 h-28 w-56 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(248,223,155,0.72),rgba(214,173,82,0.22)_28%,rgba(255,255,255,0.04)_45%,transparent_66%)] opacity-90 blur-[0.2px]" />
            <h1 className="font-serif text-6xl uppercase leading-none text-[#f8df9b] sm:text-7xl lg:text-8xl">
              Наследие
            </h1>
            <div className="my-6 flex max-w-md items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-[#d6ad52] to-transparent" />
              <span className="h-2 w-2 rotate-45 bg-[#d6ad52]" />
              <span className="h-px flex-1 bg-gradient-to-l from-[#d6ad52] to-transparent" />
            </div>
            <p className="font-serif text-2xl uppercase text-[#f8df9b] sm:text-3xl">
              Люди уходят — наследие остается
            </p>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/78">
              Сохраняйте историю своей семьи, память о близких и передавайте ее будущим поколениям.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/add-person" className="heritage-action px-6 py-4">
                <TreePine className="h-5 w-5" />
                Создать древо
              </Link>
              <Link href="/search" className="heritage-outline px-6 py-4">
                <Search className="h-5 w-5" />
                Найти родственника
              </Link>
            </div>
          </div>

          <HeroTree />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="heritage-panel p-6 sm:p-8">
          <h2 className="text-center font-serif text-2xl uppercase text-[#f8df9b]">
            Найдите историю своей семьи
          </h2>
          <div className="mx-auto my-3 h-px max-w-36 bg-gradient-to-r from-transparent via-[#d6ad52] to-transparent" />
          <form className="mt-7 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
            {["Имя", "Фамилия", "Город", "Год рождения", "Кладбище"].map((placeholder) => (
              <input key={placeholder} placeholder={placeholder} className="heritage-input" />
            ))}
            <Link href="/search" className="heritage-action px-7">
              Поиск
            </Link>
          </form>
          <p className="mt-4 text-center text-sm text-[#d6ad52]">Расширенный поиск</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-xl border border-[#d6ad52]/18 bg-black/35 md:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-4 border-[#d6ad52]/12 p-5 md:border-r md:last:border-r-0">
                <Icon className="h-8 w-8 shrink-0 text-[#d6ad52]" />
                <div>
                  <p className="font-serif text-2xl text-[#f8df9b]">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase text-white/62">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title} className="heritage-panel flex min-h-[370px] flex-col p-6">
              <div className="mb-5 flex items-center gap-3 text-[#f8df9b]">
                <Icon className="h-6 w-6" />
                <h3 className="font-serif text-xl uppercase">{card.title}</h3>
              </div>
              <p className="min-h-16 leading-7 text-white/64">{card.text}</p>
              <div className="my-6 flex flex-1 items-center justify-center">
                <CardVisual type={card.visual} />
              </div>
              <Link href={card.href} className="heritage-card-link">
                {card.action}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="heritage-panel p-7">
          <h2 className="text-center font-serif text-2xl uppercase text-[#f8df9b]">Как это работает</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#d6ad52]/32 bg-[#d6ad52]/8 text-[#d6ad52]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-serif text-[#f8df9b]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-3 text-[#f8df9b]">
            <TreePine className="h-10 w-10" />
            <span className="font-serif text-3xl uppercase">Наследие</span>
          </div>
          <p className="mt-3 text-sm text-white/52">люди уходят — наследие остается</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-white/52">
          <Link href="/family-access">О проекте</Link>
          <Link href="/documents">Архивы</Link>
          <Link href="/map">Карта</Link>
          <Link href="/login">Войти</Link>
        </div>
      </footer>
    </main>
  );
}

function HeroTree() {
  const portraits = [
    { x: "30%", y: "22%" },
    { x: "50%", y: "11%" },
    { x: "68%", y: "26%" },
    { x: "38%", y: "44%" },
    { x: "58%", y: "48%" },
    { x: "75%", y: "56%" },
  ];

  return (
    <div className="relative min-h-[560px]">
      <div className="absolute inset-x-0 bottom-10 h-28 rounded-[50%] border-t border-cyan-100/35 bg-[radial-gradient(ellipse_at_center,rgba(67,98,117,0.42),transparent_66%)]" />
      <div className="heritage-tree-glow absolute left-1/2 top-[52%] h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="absolute left-1/2 top-[50%] h-[360px] w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#fff4c7] via-[#d6ad52] to-[#8f5e20] shadow-[0_0_36px_rgba(248,223,155,0.75)]" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
        <span key={item} className={`heritage-branch heritage-branch-${item}`} />
      ))}
      {[...Array(70)].map((_, index) => (
        <span key={index} className="heritage-leaf" style={{ left: `${22 + (index * 17) % 58}%`, top: `${8 + (index * 23) % 55}%` }} />
      ))}
      {portraits.map((portrait, index) => (
        <div key={`${portrait.x}-${portrait.y}`} className="heritage-portrait" style={{ left: portrait.x, top: portrait.y }}>
          <span>{index + 1}</span>
        </div>
      ))}
      <div className="absolute bottom-16 left-1/2 h-28 w-52 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(214,173,82,0.34),transparent_70%)] blur-sm" />
    </div>
  );
}

function CardVisual({ type }: { type: string }) {
  if (type === "portrait") {
    return (
      <div className="w-36 rounded-xl border border-[#d6ad52]/24 bg-[#120d08] p-3">
        <img src="/photos/alex.jpg" alt="Иван Петрович" className="h-40 w-full rounded-lg object-cover grayscale" />
        <p className="mt-3 text-[#f8df9b]">Иван Петрович</p>
        <p className="text-xs text-white/45">1901-1978</p>
      </div>
    );
  }

  if (type === "map") {
    return (
      <div className="relative h-40 w-full rounded-lg border border-[#d6ad52]/18 bg-[radial-gradient(circle_at_30%_40%,rgba(214,173,82,0.16),transparent_30%),linear-gradient(135deg,#080b0c,#17100a)]">
        {[22, 44, 67, 78].map((left, index) => (
          <MapPin key={left} className="absolute h-6 w-6 text-[#d6ad52]" style={{ left: `${left}%`, top: `${24 + index * 15}%` }} />
        ))}
      </div>
    );
  }

  if (type === "archive") {
    return (
      <div className="relative h-40 w-full">
        {["/photos/ruslan.jpg", "/photos/alex.jpg", "/photos/ulyana.jpg"].map((src, index) => (
          <img
            key={src}
            src={src}
            alt="Архив"
            className="absolute h-28 w-24 rounded border border-[#d6ad52]/24 object-cover grayscale"
            style={{ left: `${18 + index * 24}%`, top: `${18 + (index % 2) * 22}px`, transform: `rotate(${(index - 1) * 9}deg)` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-40 w-full">
      <div className="absolute left-1/2 top-2 h-32 w-px bg-[#d6ad52]/70" />
      {[18, 42, 66].map((top, row) => (
        <div key={top} className="absolute left-1/2 flex -translate-x-1/2 gap-10" style={{ top }}>
          {[0, 1].map((item) => (
            <div key={item} className="grid h-11 w-11 place-items-center rounded-full border border-[#d6ad52]/55 bg-black text-xs text-[#f8df9b]">
              {row + item + 1}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

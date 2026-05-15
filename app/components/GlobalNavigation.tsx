"use client";

import Link from "next/link";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  GitBranch,
  Home,
  LogIn,
  MapPinned,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Главная", href: "/", icon: Home },
  { label: "Древо рода", href: "/tree", icon: GitBranch },
  { label: "Люди", href: "/people", icon: Users },
  { label: "Карта памяти", href: "/map", icon: MapPinned },
  { label: "Архивы", href: "/documents", icon: Archive },
  { label: "Поиск", href: "/search", icon: Search },
];

export default function GlobalNavigation() {
  const router = useRouter();

  return (
    <header className="fixed inset-x-0 top-0 z-[80] border-b border-[rgba(214,173,82,0.22)] bg-[#020303]/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Назад"
              title="Назад"
              className="heritage-icon-button"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => router.forward()}
              aria-label="Вперед"
              title="Вперед"
              className="heritage-icon-button"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-[#d6ad52]/35 bg-[#d6ad52]/10 text-[#f8df9b] shadow-[0_0_28px_rgba(214,173,82,0.18)]">
              <Sparkles className="h-6 w-6" />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-2xl uppercase text-[#f8df9b]">Наследие</span>
              <span className="hidden text-[10px] uppercase text-[#f7f2e8]/55 sm:block">
                люди уходят, наследие остается
              </span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="heritage-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/add-person" className="heritage-action hidden sm:inline-flex">
            <Plus className="h-4 w-4" />
            Создать
          </Link>
          <Link href="/login" className="heritage-outline hidden md:inline-flex">
            <LogIn className="h-4 w-4" />
            Войти
          </Link>
          <Link href="/register" className="heritage-outline">
            Регистрация
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 sm:px-6 xl:hidden">
        {navLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-white/72 hover:bg-white/8 hover:text-white">
              <Icon className="h-4 w-4 text-[#d6ad52]" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}

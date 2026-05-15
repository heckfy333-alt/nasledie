import Link from "next/link";
import { Archive, GitBranch, Map, Search, Shield, Sparkles } from "lucide-react";

const navigation = [
  { href: "/people", label: "Люди", icon: Search },
  { href: "/tree", label: "Древо", icon: GitBranch },
  { href: "/map", label: "Карта", icon: Map },
  { href: "/memory", label: "Архив", icon: Archive },
  { href: "/family-access", label: "Доступ", icon: Shield },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="cosmic-grid min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-yellow-200/30 bg-yellow-200/10">
              <Sparkles className="h-5 w-5 text-yellow-200" />
            </span>
            <span>
              <span className="block text-lg font-black uppercase tracking-wide gold-text">Наследие</span>
              <span className="hidden text-xs text-white/52 sm:block">память поколений</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/68 transition hover:bg-white/8 hover:text-white"
                >
                  <Icon className="h-4 w-4 text-yellow-200/80" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login" className="ghost-button px-4 text-sm">
              Войти
            </Link>
            <Link href="/add-person" className="premium-button px-4 text-sm">
              Создать
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

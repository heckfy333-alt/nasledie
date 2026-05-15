import type { Metadata, Viewport } from "next";
import "./globals.css";
import GlobalNavigation from "./components/GlobalNavigation";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Наследие | Память поколений",
    template: "%s | Наследие",
  },
  description:
    "Цифровая платформа памяти для семейных историй, мемориалов, древа, архивов, голосов и карты поколений.",
  keywords: [
    "Наследие",
    "семейное древо",
    "мемориал",
    "память поколений",
    "семейный архив",
  ],
  openGraph: {
    title: "Наследие",
    description: "Семейная социальная сеть памяти и цифровой архив поколений.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050507",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {children}
          <GlobalNavigation />
        </Providers>
      </body>
    </html>
  );
}

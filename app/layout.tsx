import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Наследие",
  description: "Цифровая память поколений",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
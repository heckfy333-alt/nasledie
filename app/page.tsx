import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #050505 0%, #111827 50%, #1f2937 100%)",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "80px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "#d4af37",
            margin: 0,
          }}
        >
          НАСЛЕДИЕ
        </h1>

        <nav
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Link href="/">Главная</Link>
          <Link href="/people">Люди</Link>
          <Link href="/map">Карта</Link>
          <Link href="/memory">Архив</Link>
        </nav>
      </header>

      <section
        style={{
          maxWidth: "900px",
          marginBottom: "80px",
        }}
      >
        <h2
          style={{
            fontSize: "54px",
            marginBottom: "20px",
            lineHeight: 1.1,
          }}
        >
          Цифровая память поколений
        </h2>

        <p
          style={{
            fontSize: "22px",
            color: "#d1d5db",
            lineHeight: 1.7,
            marginBottom: "40px",
          }}
        >
          Семейные древа, биографии, фотографии, архивы и история
          поколений в одном месте.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Link
            href="/people"
            style={{
              background: "#d4af37",
              color: "black",
              padding: "16px 28px",
              borderRadius: "14px",
              fontWeight: "bold",
            }}
          >
            Открыть платформу
          </Link>

          <Link
            href="/map"
            style={{
              border: "1px solid #444",
              padding: "16px 28px",
              borderRadius: "14px",
            }}
          >
            Карта памяти
          </Link>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px",
        }}
      >
        {[
          {
            title: "Семейные древа",
            text: "Создавайте поколения семьи с фотографиями и связями.",
          },
          {
            title: "Архив памяти",
            text: "Храните фото, видео, документы и важные события.",
          },
          {
            title: "Карта семьи",
            text: "Отмечайте места рождения и жизни поколений.",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "30px",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                marginBottom: "15px",
                color: "#d4af37",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#d1d5db",
                lineHeight: 1.7,
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
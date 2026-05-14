import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditPersonPage(props: any) {
  const params = await props.params;

  const person = await prisma.person.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!person) {
    return notFound();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f1e8",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#050505",
          borderRadius: "30px",
          padding: "40px",
        }}
      >
        <h1
          style={{
            color: "#d4a017",
            fontSize: "48px",
            marginBottom: "40px",
          }}
        >
          Редактировать человека
        </h1>

        <form
          action={`/api/people/${person.id}`}
          method="POST"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input
            name="name"
            defaultValue={person.name}
            placeholder="Имя"
            style={inputStyle}
          />

          <input
            name="birthPlace"
            defaultValue={person.birthPlace || ""}
            placeholder="Место рождения"
            style={inputStyle}
          />

          <input
            name="deathPlace"
            defaultValue={person.deathPlace || ""}
            placeholder="Место смерти"
            style={inputStyle}
          />

          <textarea
            name="bio"
            defaultValue={person.bio || ""}
            placeholder="Биография"
            style={{
              ...inputStyle,
              minHeight: "200px",
            }}
          />

          <input
            name="photo"
            defaultValue={person.photo || ""}
            placeholder="Фото"
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              background: "#d4a017",
              color: "black",
              border: "none",
              borderRadius: "20px",
              padding: "25px",
              fontSize: "26px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Сохранить изменения
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
  background: "#111",
  color: "white",
  border: "none",
  borderRadius: "20px",
  padding: "25px",
  fontSize: "24px",
};
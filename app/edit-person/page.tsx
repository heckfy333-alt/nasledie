"use client";

import { useState } from "react";

export default function EditPersonPage() {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biography, setBiography] = useState("");
  const [photo, setPhoto] = useState("");

  async function updatePerson() {
    await fetch("/api/people/" + id, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        firstName,
        lastName,
        biography,
        photo,
      }),
    });

    alert("Изменения сохранены!");
  }

  async function deletePerson() {
    await fetch("/api/people/" + id, {
      method: "DELETE",
    });

    alert("Человек удален!");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-black text-yellow-500 mb-10">
          Редактирование
        </h1>

        <div className="flex flex-col gap-5">
          <input
            placeholder="ID человека"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 p-4 rounded-2xl"
          />

          <input
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 p-4 rounded-2xl"
          />

          <input
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 p-4 rounded-2xl"
          />

          <input
            placeholder="Фото"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 p-4 rounded-2xl"
          />

          <textarea
            placeholder="Биография"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 p-4 rounded-2xl h-40"
          />

          <button
            onClick={updatePerson}
            className="bg-yellow-500 text-black p-5 rounded-2xl text-xl font-bold"
          >
            Сохранить изменения
          </button>

          <button
            onClick={deletePerson}
            className="bg-red-600 p-5 rounded-2xl text-xl font-bold"
          >
            Удалить человека
          </button>
        </div>
      </div>
    </main>
  );
}
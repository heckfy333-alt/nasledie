"use client";

import { useState } from "react";

export default function EditPersonPage() {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biography, setBiography] = useState("");
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");

  async function updatePerson() {
    setMessage("");

    const response = await fetch(`/api/people/${id}`, {
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

    setMessage(response.ok ? "Изменения сохранены" : "Не удалось сохранить изменения");
  }

  async function deletePerson() {
    setMessage("");

    const response = await fetch(`/api/people/${id}`, {
      method: "DELETE",
    });

    setMessage(response.ok ? "Человек удален" : "Не удалось удалить человека");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="heritage-panel p-6">
        <h1 className="font-serif text-3xl uppercase text-[#f8df9b]">Редактировать человека</h1>

        <div className="mt-6 grid gap-4">
          <input className="heritage-input" placeholder="ID человека" value={id} onChange={(event) => setId(event.target.value)} />
          <input className="heritage-input" placeholder="Имя" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          <input className="heritage-input" placeholder="Фамилия" value={lastName} onChange={(event) => setLastName(event.target.value)} />
          <textarea className="heritage-input min-h-32 py-4" placeholder="Биография" value={biography} onChange={(event) => setBiography(event.target.value)} />
          <input className="heritage-input" placeholder="Ссылка на фото" value={photo} onChange={(event) => setPhoto(event.target.value)} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="heritage-action px-5" type="button" onClick={updatePerson}>
            Сохранить
          </button>
          <button className="heritage-outline px-5" type="button" onClick={deletePerson}>
            Удалить
          </button>
        </div>

        {message && <p className="mt-5 text-white/72">{message}</p>}
      </div>
    </main>
  );
}

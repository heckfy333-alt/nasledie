async function getEvents() {
  const res = await fetch(
    "http://localhost:3000/api/events",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black text-yellow-500 mb-12">
          Хроника семьи
        </h1>

        <div className="flex flex-col gap-8">
          {events.map((event: any) => (
            <div
              key={event.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
            >
              <div className="text-yellow-500 text-lg mb-3">
                {event.date}
              </div>

              <h2 className="text-4xl font-bold mb-4">
                {event.title}
              </h2>

              <p className="text-zinc-300 text-lg">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
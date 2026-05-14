async function getMemories() {
  try {
    const res = await fetch(
      "http://localhost:3000/api/memories",
      {
        cache: "no-store",
      }
    );

    return await res.json();
  } catch {
    return [];
  }
}

export default async function MemoriesPage() {
  const memories =
    await getMemories();

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black text-yellow-500 mb-12">
          Архив памяти
        </h1>

        {memories.length === 0 && (
          <div className="text-2xl text-zinc-500">
            Пока нет фотографий памяти
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          {memories.map(
            (memory: any) => (
              <div
                key={memory.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
              >
                <img
                  src={memory.imageUrl}
                  alt=""
                  className="w-full h-80 object-cover"
                />

                <div className="p-6">
                  <p className="text-zinc-300 text-lg">
                    {memory.caption}
                  </p>

                  <div className="text-zinc-500 mt-4">
                    ID: {memory.id}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
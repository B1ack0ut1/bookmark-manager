export default function HomePage() {

  const bookmark = {
    title: "Next.js Documentation",
    category: "Development",
    url: "https://nextjs.org/docs",
    description: "Official documentation for Next.js.",
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Bookmark Manager
      </h1>

      <p className="mt-2 text-slate-600">
        Save and organize your favorite resources.
      </p>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-xl font-semibold text-slate-900">
          {bookmark.title}
        </h2>

        <p className="mt-2 text-slate-600">
          {bookmark.description}
        </p>
        
        <p className="mt-2 text-sm text-slate-500">
          {bookmark.category}
        </p>

        <a
          href={bookmark.url}
          className="mt-3 inline-block text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit website
        </a>
      </div>
    </main>
  );
}

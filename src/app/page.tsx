import BookmarkCard from "@/components/BookmarkCard";

type Bookmark = {
  id: number;
  title: string;
  url: string;
  description: string;
  category: string;
  favorite?: boolean;
}

export default function HomePage() {

  const bookmarks: Bookmark[] = [
    {
      id: 1,
      title: "Next.js Documentation",
      url: "https://nextjs.org/docs",
      description: "Official documentation for Next.js.",
      category: "Development",
    },
    {
      id: 2,
      title: "TypeScript Documentation",
      url: "https://www.typescriptlang.org/docs/",
      description: "Learn about TypeScript and its features.",
      category: "Development",
    },
    {
      id: 3,
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org/",
      description: "Documentation for web technologies.",
      category: "Reference",
    },
    {
      id: 4,
      title: "Tailwind CSS Documentation",
      url: "https://tailwindcss.com/docs/installation/using-vite",
      description: "Learn how to use Tailwind CSS in your projects.",
      category: "Design",
      favorite: true,
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Bookmark Manager
      </h1>

      <p className="mt-2 text-slate-600">
        Save and organize your favorite resources.
      </p>
      <div className="mt-8 space-y-4">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            title={bookmark.title}
            url={bookmark.url}
            description={bookmark.description}
            category={bookmark.category}
          />
        ))}
      </div>
    </main>
  );
}

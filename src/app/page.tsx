import type { Bookmark } from "@/src/types/bookmark";
import BookmarkBrowserLoader from "@/src/components/BookmarkBrowserLoader";
import { Suspense } from "react";

export default async function HomePage() {
    // const bookmarks: Bookmark[] = [
    //     {
    //         id: 1,
    //         title: "Next.js Documentation",
    //         url: "https://nextjs.org/docs",
    //         description: "Official documentation for Next.js.",
    //         category: "Development",
    //     },
    //     {
    //         id: 2,
    //         title: "TypeScript Documentation",
    //         url: "https://www.typescriptlang.org/docs/",
    //         description: "Learn about TypeScript and its features.",
    //         category: "Development",
    //     },
    //     {
    //         id: 3,
    //         title: "MDN Web Docs",
    //         url: "https://developer.mozilla.org/",
    //         description: "Documentation for web technologies.",
    //         category: "Reference",
    //     },
    //     {
    //         id: 4,
    //         title: "Tailwind CSS Documentation",
    //         url: "https://tailwindcss.com/docs/installation/using-vite",
    //         description: "Learn how to use Tailwind CSS in your projects.",
    //         category: "Design",
    //         favorite: true,
    //     }
    // ];

    return (
        <main className="min-h-screen bg-slate-50 p-8">
            <h1 className="text-3xl font-bold text-slate-900">
                Bookmark Manager
            </h1>

            <p className="mt-2 text-slate-600">
                Save and organize your favorite resources.
            </p>
        <Suspense fallback={<p className="mt-8 text-slate-400">Loading bookmarks...</p>}>
            <BookmarkBrowserLoader />
        </Suspense>
        </main>
    );
}

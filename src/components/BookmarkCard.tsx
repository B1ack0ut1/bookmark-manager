import type { Bookmark } from "@/types/bookmark";

type BookmarkCardProps = Pick<
  Bookmark,
  "title" | "url" | "description" | "category" | "favorite"
>;

export default function BookmarkCard({
    title,
    url,
    description,
    category,
    favorite
}: BookmarkCardProps) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-xl font-semibold text-slate-900">
                {title}
                {favorite && <span className="ml-2 text-yellow-500">★</span>}
            </h2>

            <p className="mt-2 text-slate-600">
                {description}
            </p>

            <p className="mt-2 text-sm text-slate-500">
                {category}
            </p>

            <a
                href={url}
                className="mt-3 inline-block text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                Visit website
            </a>
        </div>
    )
}
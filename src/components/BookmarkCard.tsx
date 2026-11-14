import type { Bookmark } from "@/src/types/bookmark";
import { setBookmarkFavorite, deleteBookmark } from "@/src/app/actions";

type BookmarkCardProps = Bookmark;

export default function BookmarkCard({
    id,
    title,
    url,
    description,
    category,
    favorite
}: BookmarkCardProps) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                {title}
                <form action={setBookmarkFavorite}>
                    <input type="hidden" name="id" value={id} />
                    <input type="hidden" name="favorite" value={String(!favorite)} />
                    <button
                        type="submit"
                        className=" text-yellow-500"
                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {favorite ? "★" : "☆"}
                    </button>
                </form>
                <form action={deleteBookmark} className="ml-auto">
                    <input type="hidden" name="id" value={id} />
                    <button
                        type="submit"
                        className="px-2 text-slate-500 hover:text-red-500"
                        aria-label="Delete bookmark"
                    >
                        ×
                    </button>
                </form>
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
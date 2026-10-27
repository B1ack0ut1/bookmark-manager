import type { Bookmark } from "@/types/bookmark";
import BookmarkCard from "./BookmarkCard";

type BookmarkListProps = {
    filteredBookmarks: Bookmark[],
}

export default function BookmarkList({
    filteredBookmarks,
}: BookmarkListProps) {
    return (
        <div className="mt-8 space-y-4">
            {filteredBookmarks.length < 1
                ? <p className="text-slate-400">No bookmarks found.</p>
                : filteredBookmarks.map((bookmark) => (
                    <BookmarkCard
                        key={bookmark.id}
                        title={bookmark.title}
                        url={bookmark.url}
                        description={bookmark.description}
                        category={bookmark.category}
                        favorite={bookmark.favorite}
                    />
                ))}
        </div>
    )
}
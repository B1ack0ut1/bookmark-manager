"use client";
import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import type { Bookmark } from "@/types/bookmark";

type BookmarkSearchProps = {
    bookmarks: Bookmark[],
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
    setFilteredBookmarks: Dispatch<SetStateAction<Bookmark[]>>,
}

export default function BookmarkSearch({
    bookmarks,
    search,
    setSearch,
    setFilteredBookmarks
}: BookmarkSearchProps) {

    const filteredBookmarks = bookmarks.filter((bookmark) =>
        bookmark.title.toLowerCase().includes(search.toLowerCase()) ||
        bookmark.description.toLowerCase().includes(search.toLowerCase())
    );

    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {

        const newSearch = e.target.value;
        setSearch(newSearch);
        setFilteredBookmarks(
            bookmarks.filter((bookmark) =>
                bookmark.title.toLowerCase().includes(newSearch.toLowerCase()) ||
                bookmark.description.toLowerCase().includes(newSearch.toLowerCase())
            )
        );
    }

    return (
        <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search bookmarks..."
            className="w-full p-3 mt-6 border border-slate-300 rounded-lg bg-white text-slate-900"
        />
    )
}
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


    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {

        const newSearch = e.target.value;

        const filteredBookmarks = bookmarks.filter((bookmark) =>
            bookmark.title.toLowerCase().includes(search.toLowerCase()) ||
            bookmark.description.toLowerCase().includes(search.toLowerCase())
        );

        setSearch(newSearch);
        setFilteredBookmarks(filteredBookmarks);
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
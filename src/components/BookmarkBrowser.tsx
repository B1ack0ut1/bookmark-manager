"use client";
import type { Bookmark } from "@/types/bookmark";
import BookmarkSearch from "@/components/BookmarkSearch";
import BookmarkList from "./BookmarkList";
import { useState } from "react";

type BookmarkBrowserProps = {
    bookmarks: Bookmark[],
}

export default function BookmarkBrowser({
    bookmarks,
}: BookmarkBrowserProps) {
    const [search, setSearch] = useState("");
    const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>(bookmarks);

    return (
        <>
            <BookmarkSearch
                bookmarks={bookmarks}
                search={search}
                setSearch={setSearch}
                setFilteredBookmarks={setFilteredBookmarks}
             />

            <BookmarkList filteredBookmarks={filteredBookmarks} />
        </>
    )
}
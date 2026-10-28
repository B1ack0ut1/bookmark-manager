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
    const filteredBookmarks = bookmarks.filter((bookmark) =>
        bookmark.title.toLowerCase().includes(search.toLowerCase()) ||
        bookmark.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <BookmarkSearch
                search={search}
                onSearchChange={setSearch}
             />

            <BookmarkList filteredBookmarks={filteredBookmarks} />
        </>
    )
}
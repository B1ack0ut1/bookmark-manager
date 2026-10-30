"use client";

import type { Bookmark } from "@/types/bookmark";
import BookmarkSearch from "@/components/BookmarkSearch";
import BookmarkList from "./BookmarkList";
import FavoritesFilter from "./FavoritesFilter";
import { useState } from "react";

type BookmarkBrowserProps = {
    bookmarks: Bookmark[],
}

export default function BookmarkBrowser({
    bookmarks,
}: BookmarkBrowserProps) {
    const [search, setSearch] = useState("");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const normalizedSearch = search.trim().toLowerCase();

    const matchesSearch = (bookmark: Bookmark) => 
        bookmark.title.toLowerCase().includes(normalizedSearch) ||
        bookmark.description.toLowerCase().includes(normalizedSearch);

    const matchesFavoritesCondition= (bookmark: Bookmark) =>
        !showFavoritesOnly || bookmark.favorite;

    const filteredBookmarks = bookmarks
        .filter((bookmark) => matchesSearch(bookmark) && matchesFavoritesCondition(bookmark));

    return (
        <>
            <BookmarkSearch
                search={search}
                onSearchChange={setSearch}
             />

            <FavoritesFilter
                checked={showFavoritesOnly}
                onCheckedChange={setShowFavoritesOnly}
            />

            <BookmarkList filteredBookmarks={filteredBookmarks} />
        </>
    )
}
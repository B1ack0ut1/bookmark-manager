import { prisma } from "@/lib/prisma";
import BookmarkBrowser from "@/src/components/BookmarkBrowser";

export default async function BookmarkBrowserLoader() {
    const bookmarks = await prisma.bookmark.findMany({
        orderBy: {
            id: "asc",
        }
    });

    return <BookmarkBrowser bookmarks={bookmarks} />;
}
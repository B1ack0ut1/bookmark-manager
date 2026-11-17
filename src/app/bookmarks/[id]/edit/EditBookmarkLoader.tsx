import type { EditBookmarkPageProps } from "./page";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateBookmark } from "@/src/app/actions";
import SaveBookmarkButton from "./SaveBookmarkButton";

export default async function EditBookmarkLoader({ params }: EditBookmarkPageProps) {
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (!/^[1-9]\d*$/.test(rawId) || id > 2_147_483_647) {
        notFound();
    }

    const bookmark = await prisma.bookmark.findUnique({
        where: { id },
    })

    if (!bookmark) {
        notFound();
    }

    return (
            <form 
                key={`${bookmark.id}-${bookmark.updatedAt.toISOString()}`}
                action={updateBookmark} 
                className="mt-4 grid gap-2"
            >
                <input type="hidden" name="id" value={bookmark.id} />
                <label className="grid gap-1 text-slate-900">
                    Title
                    <input
                        className="p-3 rounded border border-slate-300 bg-white"
                        type="text"
                        name="title"
                        defaultValue={bookmark.title}
                        required
                    />
                </label>
                <label className="grid gap-1 text-slate-900">
                    URL
                    <input
                        className="p-3 rounded border border-slate-300 bg-white"
                        type="url"
                        name="url"
                        defaultValue={bookmark.url}
                        required
                    />
                </label>
                <label className="grid gap-1 text-slate-900">
                    Description
                    <textarea
                        className="p-3 rounded border border-slate-300 bg-white"
                        name="description"
                        defaultValue={bookmark.description}
                        required
                    />
                </label>
                <label className="grid gap-1 text-slate-900">
                    Category
                    <input
                        className="p-3 rounded border border-slate-300 bg-white"
                        type="text"
                        name="category"
                        defaultValue={bookmark.category}
                        required
                    />
                </label>
                <SaveBookmarkButton />
            </form>
    )
}
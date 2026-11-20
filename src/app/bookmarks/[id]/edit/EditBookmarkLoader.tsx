import type { EditBookmarkPageProps } from "./page";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditBookmarkForm from "./EditBookmarkForm";

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
        <EditBookmarkForm
            key={`${bookmark.id}-${bookmark.updatedAt.toISOString()}`}
            bookmark={bookmark}     
        />
    )
}
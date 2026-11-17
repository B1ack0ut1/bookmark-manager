import { Suspense } from "react";
import EditBookmarkLoader from "./EditBookmarkLoader";

export type EditBookmarkPageProps = {
    params: Promise<{ id: string }>
}

export default function EditBookmarkPage({ params }: EditBookmarkPageProps) {
    return (
        <main className="p-8 min-h-screen bg-slate-50 text-black">
            <h1 className="text-2xl font-bold">Edit Bookmark</h1>
            <Suspense fallback={<p>Loading bookmark...</p>}>
                <EditBookmarkLoader params={params} />
            </Suspense>
        </main>
    )
}
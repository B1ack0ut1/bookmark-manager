import { createBookmark } from "@/src/app/actions";

export default function BookmarkForm() {
    return (
        <form action={createBookmark} className="mt-6 grid max-w-lg gap-3">
            <h2 className="text-xl font-semibold text-slate-900">
                Add a bookmark
            </h2>

            <label className="grid gap-1 text-slate-900">
                Title
                <input name="title" required className="rounded border border-slate-200 bg-white p-2" />
            </label>

            <label className="grid gap-1 text-slate-900">
                URL
                <input
                    name="url"
                    type="url"
                    required
                    className="rounded border border-slate-200 bg-white p-2"
                />
            </label>

            <label className="grid gap-1 text-slate-900">
                Description
                <textarea
                    name="description"
                    required
                    className="rounded border border-slate-200 bg-white p-2"
                />
            </label>

            <label className="grid gap-1 text-slate-900">
                Category
                <input
                    name="category"
                    required
                    className="rounded border border-slate-200 bg-white p-2"
                />
            </label>

            <button
                type="submit"
                className="justify-self-start rounded bg-slate-800 px-4 py-2 text-white cursor-pointer hover:bg-slate-700 transition-colors duration-150 ease-in-out"
            >
                Save a bookmark
            </button>
        </form>
    )
}
"use client";

import type { Bookmark } from "@/src/types/bookmark";
import { updateBookmark } from "@/src/app/actions";
import { useActionState } from "react";
import SaveBookmarkButton from "./SaveBookmarkButton";

export default function EditBookmarkForm({
    bookmark,
}: {
    bookmark: Bookmark,
}) {
    const [state, formAction] = useActionState(updateBookmark, {
        fieldErrors: {},
        submitted: null,
    });

    const submittedUrl = state.submitted?.get("url");

    return (
            <form 
                action={formAction} 
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
                        aria-invalid={Boolean(state.fieldErrors.title)}
                        aria-describedby={state.fieldErrors.title ? "bookmark-title-error" : undefined}
                        required
                    />
                </label>
                {state.fieldErrors.title && (
                    <p id="bookmark-title-error" role="alert">{state.fieldErrors.title}</p>
                )}
                <label className="grid gap-1 text-slate-900">
                    URL
                    <input
                        className="p-3 rounded border border-slate-300 bg-white"
                        type="url"
                        name="url"
                        defaultValue={typeof submittedUrl === "string" ? submittedUrl : bookmark.url}
                        aria-invalid={Boolean(state.fieldErrors.url)}
                        aria-describedby={state.fieldErrors.url ? "bookmark-url-error" : undefined}
                        required
                    />
                </label>
                {state.fieldErrors.url && (
                    <p id="bookmark-url-error" role="alert">{state.fieldErrors.url}</p>
                )}
                <label className="grid gap-1 text-slate-900">
                    Description
                    <textarea
                        className="p-3 rounded border border-slate-300 bg-white"
                        name="description"
                        defaultValue={bookmark.description}
                        aria-invalid={Boolean(state.fieldErrors.description)}
                        aria-describedby={state.fieldErrors.description ? "bookmark-description-error" : undefined}
                        required
                    />
                </label>
                {state.fieldErrors.description && (
                    <p id="bookmark-description-error" role="alert">{state.fieldErrors.description}</p>
                )}
                <label className="grid gap-1 text-slate-900">
                    Category
                    <input
                        className="p-3 rounded border border-slate-300 bg-white"
                        type="text"
                        name="category"
                        defaultValue={bookmark.category}
                        aria-invalid={Boolean(state.fieldErrors.category)}
                        aria-describedby={state.fieldErrors.category ? "bookmark-category-error" : undefined}
                        required
                    />
                </label>
                {state.fieldErrors.category && (
                    <p id="bookmark-category-error" role="alert">{state.fieldErrors.category}</p>
                )}
                <SaveBookmarkButton />
            </form>
    )
}
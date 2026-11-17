"use client";

import { useFormStatus } from "react-dom";

export default function SaveBookmarkButton() {
    const { pending } = useFormStatus();

    return (
        <button 
            type="submit" 
            disabled={pending}
            className="min-w-40 justify-self-start rounded bg-slate-800 px-4 py-2 text-white cursor-pointer hover:bg-slate-700 transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-default"
        >
            { pending ? "Saving..." : "Save Changes"}
        </button>
    );
}
"use server";

import { refresh, revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type EditBookmarkState = {
    fieldErrors: Partial<
        Record<"title" | "url" | "description" | "category", string>
    >;
    submitted: FormData | null;
}

type ValidationResult =
    | { success: false; fieldErrors: EditBookmarkState["fieldErrors"] }
    | {
        success: true;
        data: {
            title: string;
            url: URL;
            description: string;
            category: string;
        }
    }

export async function createBookmark(formData: FormData) {
    const title = formData.get("title");
    const url = formData.get("url");
    const description = formData.get("description");
    const category = formData.get("category");

    if (
        typeof title !== "string" || !title.trim() ||
        typeof url !== "string" || !url.trim() ||
        typeof description !== "string" || !description.trim() ||
        typeof category !== "string" || !category.trim()
    ) {
        throw new Error("Fill in all Bookmark fields.");
    }

    const parsedUrl = new URL(url.trim());

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        throw new Error("Use a http or https URL.");
    }

    await prisma.bookmark.create({
        data: {
            title: title.trim(),
            url: parsedUrl.href,
            description: description.trim(),
            category: category.trim(),
        }
    });

    refresh();
}

export async function setBookmarkFavorite(formData: FormData) {
    const id = formData.get("id");
    const favorite = formData.get("favorite");

    if (
        typeof id !== "string" || !id.trim() || isNaN(Number(id)) || Number(id) < 1 ||
        favorite !== "true" && favorite !== "false"
    ) {
        throw new Error("Invalid bookmark ID or favorite value.");
    }

    const parsedId = Number(id);
    const parsedFavorite = favorite === "true";

    await prisma.bookmark.update({
        where: {
            id: parsedId,
        },
        data: {
            favorite: parsedFavorite,
        }
    });

    refresh();
}

export async function deleteBookmark(formData: FormData) {
    const id = formData.get("id");

    if (
        typeof id !== "string" || !id.trim() || isNaN(Number(id)) || Number(id) < 1
    ) {
        throw new Error("Invalid bookmark ID.");
    }

    const parsedId = Number(id);

    await prisma.bookmark.delete({
        where: {
            id: parsedId,
        }
    });

    refresh();
}

export async function updateBookmark(
    _previousState: EditBookmarkState,
    formData: FormData
): Promise<EditBookmarkState> {
    const id = formData.get("id");

    if (typeof id !== "string" || !id.trim() || isNaN(Number(id)) || Number(id) < 1) {
        throw new Error("Invalid bookmark ID.");
    }

    const parsedId = Number(id);

    const validation = validateBookmark(formData);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!validation.success) {
        return {
            fieldErrors: validation.fieldErrors,
            submitted: formData,
        }
    }

    await prisma.bookmark.update({
        where: {
            id: parsedId,
        },
        data: {
            title: validation.data.title,
            url: validation.data.url.href,
            description: validation.data.description,
            category: validation.data.category,
        }
    });

    revalidatePath("/");
    revalidatePath(`/bookmarks/${id}/edit`)
    redirect("/");
}

function validateBookmark(formData: FormData): ValidationResult {
    const title = formData.get("title");
    const url = formData.get("url");
    const description = formData.get("description");
    const category = formData.get("category");

    const fieldErrors: EditBookmarkState["fieldErrors"] = {};

    const trimmedTitle =
        typeof title === "string" ? title.trim() : "";

    const trimmedDescription =
        typeof description === "string" ? description.trim() : "";

    const trimmedCategory =
        typeof category === "string" ? category.trim() : "";

    if (!trimmedTitle) fieldErrors.title = "Enter a title.";
    if (!trimmedDescription) fieldErrors.description = "Enter a description.";
    if (!trimmedCategory) fieldErrors.category = "Enter a category";

    let parsedUrl: URL | undefined;

    const trimmedUrl =
        typeof url === "string" ? url.trim() : "";


    if (!trimmedUrl) {
        fieldErrors.url = "Enter a url."
    } else {
        parsedUrl = new URL(trimmedUrl);

        try {
            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                fieldErrors.url = "Use an http or https URL.";
            }
        } catch {

            fieldErrors.url = "Enter a valid url.";
        }
    }

    if (Object.keys(fieldErrors).length > 0) {
        return {
            success: false,
            fieldErrors
        };
    }

    // Defensive narrowing, should be unreachable in practice
    if (!parsedUrl) {
        return {
            success: false,
            fieldErrors: { url: "Enter a valid url."},
        }
    }

    return {
        success: true,
        data: {
            title: trimmedTitle,
            url: parsedUrl,
            description: trimmedDescription,
            category: trimmedCategory,
        }
    }
}
"use server";

import { refresh } from "next/cache";
import { prisma } from "@/lib/prisma";

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
        data : {
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
    })

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
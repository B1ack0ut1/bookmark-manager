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
    })
}
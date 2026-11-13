import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
    const bookmark = await prisma.bookmark.create({
        data: {
            title: "Tailwind CSS Documentation",
            url: "https://tailwindcss.com/docs/installation/using-vite",
            description: "Learn how to use Tailwind CSS in your projects.",
            category: "Design",
            favorite: true,
        },
    });

    console.log("Created bookmark:", bookmark);
}

main()
    .finally(() => prisma.$disconnect())
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
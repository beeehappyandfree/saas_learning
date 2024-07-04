'use server';

import prisma from "@/libs/db";
import { revalidatePath } from "next/cache";

  
export async function createPost(formData: FormData) {
    await prisma.posts.create({
        data: {
            title: formData.get("title") as string,
            slug: (formData.get("title") as string)
                    .replace(/\s+/g, "-")
                    .toLowerCase(),
            content: formData.get("content") as string,
            author: {
                connect: {
                    email: "john@gmail.com"
                }
            }
        }
    })
    revalidatePath("/posts")
}

export async function editPost(formData: FormData, id: string) {
    await prisma.posts.update({
        where: { id },
        data: {
            title: formData.get("title") as string,
            slug: (formData.get("title") as string)
                    .replace(/\s+/g, "-")
                    .toLowerCase(),
            content: formData.get("content") as string
        }
    })
}

export async function deletePost(id: string) {
    await prisma.posts.delete({
        where: { id }
    })
}
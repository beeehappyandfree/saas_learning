import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST (
    req: Request
) {
    try {
        const { title } = await req.json();
        const course = await db.course.create({
            data: {
                title
            }
        })
        return new NextResponse(course, {
            status: 200
        })
    } catch (error) {
        console.log("COURSE_ERROR", error);
        return new NextResponse("An error occurred", {
            status: 500
        })
    }
}
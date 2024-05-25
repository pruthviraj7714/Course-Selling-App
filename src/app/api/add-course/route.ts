import authOptions from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { CourseSchema } from "@/schemas/courseSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user?.role !== "admin") {
    return NextResponse.json(
      {
        message: "Only Admins Can Add Courses",
      },
      { status: 401 }
    );
  }

  try {
    const data = await req.json();
    const parsedData = CourseSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: parsedData.error.errors.map((err) => err.message).join(", "),
        },
        { status: 400 }
      );
    }

    const {
      title,
      description,
      price,
      content,
      duration,
      instructor,
      category,
      thumbnail,
    } = parsedData.data;

    await Course.create({
      title,
      description,
      price,
      content,
      duration,
      instructor,
      category,
      thumbnail,
    });

    return NextResponse.json(
      { message: "Course created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

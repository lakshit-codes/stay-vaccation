import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";
import { ObjectId } from "mongodb";

// UPDATE CATEGORY
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });

    const body = await req.json();
    const db = await getDatabase();

    // Remove _id from body to avoid trying to update the immutable _id field
    const { _id, ...updateData } = body;
    
    const queryId = ObjectId.isValid(id) ? new ObjectId(id) : id;

    await db.collection("categories").updateOne(
      { _id: queryId as any },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CATEGORY PUT ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// DELETE CATEGORY
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });

    const db = await getDatabase();
    const queryId = ObjectId.isValid(id) ? new ObjectId(id) : id;

    const result = await db.collection("categories").deleteOne({ _id: queryId as any });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CATEGORY DELETE ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDatabase } from "@/app/utils/getDatabase";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET!;

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    let token = req.cookies.get("sv_token")?.value;
    
    if (!token) {
      const authHeader = req.headers.get("Authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated." },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
      email: string;
    };

    const db = await getDatabase();
    const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token." },
      { status: 401 }
    );
  }
}

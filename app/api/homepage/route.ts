import { NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();
    const settings = await db.collection("homepageSettings").findOne({});
    
    if (!settings) {
      return NextResponse.json({ success: false, message: "No settings found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      data: settings 
    });
  } catch (err) {
    console.error("GET HOMEPAGE SETTINGS ERROR:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "../../utils/getDatabase";

// GET global business settings
export async function GET(req: NextRequest) {
  try {
    const db = await getDatabase();
    
    // Attempt to fetch the first and only document in the businessSettings collection
    const settings = await db.collection("businessSettings").findOne({});
    
    if (!settings) {
      // If collection is empty, return a default fallback response
      return NextResponse.json({
        success: true,
        data: {
          businessName: "Stay Vacation",
          address: "",
          phoneNumber: "",
          email: "",
          logo: null,
          facebook: "",
          instagram: "",
          twitter: "",
          footerText: "Crafting unforgettable journeys across the world. From serene beach escapes to thrilling mountain adventures — we curate every moment."
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...settings,
        _id: settings._id.toString()
      }
    }, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    console.error("GET BUSINESS SETTINGS ERROR:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// POST / PUT Update the global business settings
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDatabase();

    const { _id, ...updateData } = body;
    
    // We only need one global setting document, we can use an upsert with an empty filter
    // If multiple documents somehow got created, this targets the first one
    const existing = await db.collection("businessSettings").findOne({});
    
    if (existing) {
      await db.collection("businessSettings").updateOne(
        { _id: existing._id },
        {
          $set: {
            ...updateData,
            updatedAt: new Date()
          }
        }
      );
    } else {
      await db.collection("businessSettings").insertOne({
        ...updateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return NextResponse.json({ success: true, message: "Settings saved correctly" });
  } catch (err) {
    console.error("PUT BUSINESS SETTINGS ERROR:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";

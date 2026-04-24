import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";
import { REGIONS } from "../../../constants/regions";

export async function GET(req: NextRequest) {
  try {
    const db = await getDatabase();

    // 1. Clear existing collections (Optional, but ensures clean migration)
    await db.collection("regions").deleteMany({});
    await db.collection("destinations").deleteMany({});

    console.log("Seeding regions and destinations...");

    for (let i = 0; i < REGIONS.length; i++) {
      const regionData = REGIONS[i];
      
      // Insert Region
      const regionResult = await db.collection("regions").insertOne({
        name: regionData.name,
        icon: regionData.icon,
        order: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const regionId = regionResult.insertedId.toString();

      // Insert Destinations for this region
      if (regionData.destinations && regionData.destinations.length > 0) {
        const destsToInsert = regionData.destinations.map(d => ({
          name: d.name,
          slug: d.name.toLowerCase().trim().replace(/\s+/g, '-'),
          regionId: regionId,
          image: "", // Placeholder or could be linked from static if available
          description: d.tagline || "",
          isActive: true,
          isEnabled: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

        await db.collection("destinations").insertMany(destsToInsert);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Database seeded successfully with regions and destinations! 🌏" 
    });

  } catch (err) {
    console.error("SEEDING ERROR:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const db = await getDatabase();
    const destinations = await db.collection("destinations").find().toArray();
    const packages = await db.collection("packages").find().toArray();

    console.log(`[LINKING] Found ${destinations.length} destinations and ${packages.length} packages.`);

    let linkedCount = 0;

    for (const pkg of packages) {
      // Find matching destination by name
      const matchingDest = destinations.find(d => 
        d.name.toLowerCase().includes(pkg.destination.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(d.name.toLowerCase())
      );

      if (matchingDest) {
        await db.collection("packages").updateOne(
          { _id: pkg._id },
          { 
            $set: { 
              destinationId: matchingDest._id,
              destinationSlug: matchingDest.slug
            } 
          }
        );
        linkedCount++;
        console.log(`[LINKING] Linked package "${pkg.title}" to destination "${matchingDest.name}"`);
      } else {
        console.warn(`[LINKING] No match found for package "${pkg.title}" with destination string "${pkg.destination}"`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully linked ${linkedCount} out of ${packages.length} packages to destinations based on name matching.`,
    });

  } catch (err) {
    console.error("LINKING ERROR:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

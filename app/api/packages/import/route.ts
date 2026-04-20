import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "../../../utils/getDatabase";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const rawData = await req.json();

    if (!Array.isArray(rawData)) {
      return NextResponse.json(
        { message: "Payload must be an array of packages.", success: false },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection("packages");

    let total = rawData.length;
    let imported = 0;
    let skipped = 0;
    let errors: any[] = [];

    const safeObjectId = (ref: any) => {
      if (!ref) return null;
      const str = typeof ref === 'string' ? ref : ref.toString();
      return ObjectId.isValid(str) ? new ObjectId(str) : null;
    };

    let index = 0;
    for (const bodyRaw of rawData) {
      try {
        const { id: _clientId, _id: _clientMongoId, ...body } = bodyRaw;

        // Validations
        const missing = [];
        if (!body.title) missing.push("title");
        if (!body.destination) missing.push("destination");
        if (!body.tripDuration) missing.push("tripDuration");
        if (!body.price?.amount) missing.push("price.amount");
        if (!Array.isArray(body.itinerary)) missing.push("itinerary");

        if (missing.length > 0) {
          skipped++;
          errors.push({ packageTitle: body.title || `Package index ${index}`, reason: `Missing ${missing.join(", ")} in package index ${index}` });
          index++;
          continue;
        }

        // Duplicates check
        const query: any[] = [ { title: body.title } ];
        if (body.packageId) {
          query.push({ packageId: body.packageId });
        } else if (body.id) {
          // If the package exported had human-readable ID under .id instead of .packageId
          query.push({ id: body.id });
        }

        const exactMatch = await collection.findOne({ $or: query });
        if (exactMatch) {
          skipped++;
          errors.push({ packageTitle: body.title, reason: "Duplicate package (matching title or packageId)." });
          continue;
        }

        const newPackageId = body.packageId || body.id || `pkg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

        const cleanedItinerary = body.itinerary.map((day: any) => ({
          ...day,
          hotelStays: day.hotelStays?.map((h: any) => ({
            ...h,
            hotelRef: safeObjectId(h.hotelRef),
          })) || [],
          activities: day.activities?.map((a: any) => ({
            ...a,
            activityRef: safeObjectId(a.activityRef),
          })) || [],
          transfers: day.transfers?.map((t: any) => ({ ...t })) || [],
        }));

        await collection.insertOne({
          ...body,
          id: newPackageId,
          packageId: body.packageId || newPackageId,
          itinerary: cleanedItinerary,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        imported++;
      } catch (err: any) {
        skipped++;
        errors.push({ packageTitle: bodyRaw.title || `Package index ${index}`, reason: err.message });
      } finally {
        index++;
      }
    }

    return NextResponse.json(
      {
        message: "Import complete",
        success: true,
        total,
        imported,
        skipped,
        errors
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("IMPORT ERROR:", err);
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

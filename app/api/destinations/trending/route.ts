import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";

export const dynamic = "force-dynamic";

/**
 * GET /api/destinations/trending
 *
 * Query params:
 *   category  — optional, "India" | "International"
 *               case-insensitive match against the `category` field.
 *               Omit to return ALL trending destinations.
 *
 * Response shape:
 *   { success: true, data: Destination[], total: number }
 *
 * Only returns destinations where isTrending === true.
 * Enriches each record with a real-time `packageCount` from the packages collection.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryParam = searchParams.get("category"); // e.g. "India" | "International"

    const db = await getDatabase();

    // ── Build MongoDB filter ────────────────────────────────────────
    const filter: Record<string, any> = { isTrending: true };

    if (categoryParam) {
      // Case-insensitive match so "india" == "India"
      filter.category = { $regex: new RegExp(`^${categoryParam.trim()}$`, "i") };
    }

    const destinations = await db
      .collection("destinations")
      .find(filter)
      .sort({ name: 1 })
      .toArray();

    // ── Enrich with real package counts ────────────────────────────
    const packageCounts = await db
      .collection("packages")
      .aggregate([
        { $group: { _id: "$destinationSlug", count: { $sum: 1 } } },
      ])
      .toArray();

    const countMap: Record<string, number> = {};
    packageCounts.forEach((pc) => {
      if (pc._id) countMap[pc._id] = pc.count;
    });

    // ── Normalize _id and attach packageCount ───────────────────────
    const normalized = destinations.map((d) => ({
      ...d,
      _id: d._id.toString(),
      packageCount: countMap[d.slug] || 0,
    }));

    return NextResponse.json(
      { success: true, data: normalized, total: normalized.length },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err) {
    console.error("TRENDING DESTINATIONS GET ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch trending destinations" },
      { status: 500 }
    );
  }
}

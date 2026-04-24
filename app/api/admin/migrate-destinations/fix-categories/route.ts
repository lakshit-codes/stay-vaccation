import { NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/migrate-destinations/fix-categories
 *
 * Re-classifies destination categories based on regionId groupings.
 * Fetches all regions, identifies which are "International" vs "India"
 * by checking region names, then updates all destinations in those regions.
 *
 * Also allows overriding via a known list of international destination slugs
 * in case regions aren't named clearly enough.
 */

// Known international destination slugs (catch-all for edge cases)
const KNOWN_INTERNATIONAL_SLUGS = new Set([
  "dubai,-uae", "abu-dhabi,-uae", "maldives", "istanbul,-turkey",
  "santorini,-greece", "paris,-france", "switzerland", "rome,-italy",
  "new-zealand", "bali-(ubud)", "japan", "australia",
  "bali", "thailand", "singapore", "london", "tokyo",
  "dubai", "paris", "santorini", "amsterdam", "barcelona",
  "new-york", "los-angeles", "sydney", "toronto", "hong-kong",
  "malaysia", "vietnam", "cambodia", "nepal", "sri-lanka",
  "bhutan", "myanmar", "philippines", "indonesia",
]);

// Keywords in region names that indicate international
const INTERNATIONAL_REGION_KEYWORDS = [
  "international", "europe", "asia", "middle east", "americas",
  "africa", "oceania", "south east", "far east", "world",
];

export async function POST() {
  try {
    const db = await getDatabase();

    // ── Fetch all regions ─────────────────────────────────────────
    const regions = await db.collection("regions").find({}).toArray();

    // Build a set of regionIds that are "International"
    const internationalRegionIds = new Set<string>();
    for (const region of regions) {
      const name = (region.name || "").toLowerCase();
      const isIntl = INTERNATIONAL_REGION_KEYWORDS.some((kw) => name.includes(kw));
      if (isIntl) internationalRegionIds.add(region._id.toString());
    }

    // ── Fetch all destinations ────────────────────────────────────
    const destinations = await db.collection("destinations").find({}).toArray();

    let indiaCount = 0;
    let intlCount  = 0;
    const bulkOps: any[] = [];

    for (const dest of destinations) {
      const regionId   = dest.regionId?.toString() ?? "";
      const slug       = (dest.slug ?? "").toLowerCase();
      const name       = (dest.name ?? "").toLowerCase();

      // Decide category
      const isIntl =
        internationalRegionIds.has(regionId) ||
        KNOWN_INTERNATIONAL_SLUGS.has(slug)  ||
        // Name-based heuristics for common international destinations
        ["dubai", "bali", "thailand", "paris", "tokyo", "singapore",
         "maldives", "switzerland", "japan", "australia", "new zealand",
         "istanbul", "santorini", "rome", "london", "abu dhabi",
         "new zealand", "vietnam", "malaysia", "philippines"].some((kw) =>
          name.includes(kw)
        );

      const category = isIntl ? "International" : "India";
      if (isIntl) intlCount++; else indiaCount++;

      bulkOps.push({
        updateOne: {
          filter: { _id: dest._id },
          update: { $set: { category, updatedAt: new Date() } },
        },
      });
    }

    if (bulkOps.length > 0) {
      await db.collection("destinations").bulkWrite(bulkOps);
    }

    return NextResponse.json({
      success: true,
      total:     destinations.length,
      india:     indiaCount,
      intl:      intlCount,
      message:   `Re-classified ${destinations.length} destinations: ${indiaCount} India, ${intlCount} International.`,
    });
  } catch (err) {
    console.error("FIX CATEGORIES ERROR:", err);
    return NextResponse.json(
      { success: false, message: String(err) },
      { status: 500 }
    );
  }
}

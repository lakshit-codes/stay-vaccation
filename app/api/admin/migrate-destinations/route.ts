import { NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/migrate-destinations
 *
 * One-time migration that backfills two new fields on every existing
 * destination document that is missing them:
 *
 *   isTrending  → false   (not trending by default)
 *   category    → derived from existing `type` field if present,
 *                 otherwise defaults to "India"
 *
 * Uses `$exists: false` in the filter so it is SAFE to run multiple
 * times — it only touches documents that genuinely lack the field.
 *
 * Response:
 *   {
 *     success: true,
 *     isTrendingPatched: number,   // docs that got isTrending added
 *     categoryPatched:   number,   // docs that got category added
 *     total:             number,   // total docs in collection
 *   }
 */
export async function POST() {
  try {
    const db = await getDatabase();
    const col = db.collection("destinations");

    // ── 1. Backfill isTrending = false where missing ──────────────
    const isTrendingResult = await col.updateMany(
      { isTrending: { $exists: false } },
      {
        $set: {
          isTrending: false,
          updatedAt: new Date(),
        },
      }
    );

    // ── 2. Backfill category where missing ────────────────────────
    // Try to derive from the legacy `type` field:
    //   type === "international"  →  "International"
    //   type === "india" / anything else  →  "India"
    // Docs that already have category are untouched.

    // Fetch only docs missing `category` so we can apply per-doc logic
    const missingCategory = await col
      .find({ category: { $exists: false } })
      .toArray();

    let categoryPatched = 0;

    if (missingCategory.length > 0) {
      const bulkOps = missingCategory.map((doc) => {
        const inferredCategory =
          typeof doc.type === "string" &&
          doc.type.toLowerCase().trim() === "international"
            ? "International"
            : "India";

        return {
          updateOne: {
            filter: { _id: doc._id },
            update: {
              $set: {
                category: inferredCategory,
                updatedAt: new Date(),
              },
            },
          },
        };
      });

      const bulkResult = await col.bulkWrite(bulkOps);
      categoryPatched = bulkResult.modifiedCount;
    }

    // ── 3. Totals ─────────────────────────────────────────────────
    const total = await col.countDocuments();

    return NextResponse.json({
      success: true,
      isTrendingPatched: isTrendingResult.modifiedCount,
      categoryPatched,
      total,
      message: `Migration complete. isTrending set on ${isTrendingResult.modifiedCount} doc(s), category set on ${categoryPatched} doc(s). Total destinations: ${total}.`,
    });
  } catch (err) {
    console.error("MIGRATION ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Migration failed", error: String(err) },
      { status: 500 }
    );
  }
}

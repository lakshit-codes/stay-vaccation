import { NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";

export async function POST() {
  try {
    const db = await getDatabase();
    
    const initialCategories = [
      { 
        name: "Beach & Islands", 
        slug: "beach-islands",
        icon: "🏖️", 
        color: "from-sky-500 to-blue-700", 
        link: "/packages?type=Beach", 
        order: 1,
        shortLocationList: "Bali · Maldives · Goa · Phuket",
        description: "Crystal-clear waters, powdery white sands, and coral reefs waiting to be explored.",
        isActive: true
      },
      { 
        name: "Heritage & Culture", 
        slug: "heritage-culture",
        icon: "🏛️", 
        color: "from-amber-500 to-orange-700", 
        link: "/packages?type=Heritage", 
        order: 2,
        shortLocationList: "Rajasthan · Rome · Istanbul · Kyoto",
        description: "Step back in time through ancient palaces, magnificent temples, and living heritage sites.",
        isActive: true
      },
      { 
        name: "Adventure Sports", 
        slug: "adventure-sports",
        icon: "🧗", 
        color: "from-emerald-500 to-teal-700", 
        link: "/packages?type=Adventure%20Sports", 
        order: 3,
        shortLocationList: "Himachal · Rishikesh · New Zealand",
        description: "Adrenaline-charged experiences from white-water rafting to skydiving and trekking.",
        isActive: true
      },
      { 
        name: "Wildlife & Nature", 
        slug: "wildlife-nature",
        icon: "🦁", 
        color: "from-lime-500 to-green-700", 
        link: "/packages?type=Wildlife", 
        order: 4,
        shortLocationList: "Kenya · Ranthambore · Amazon",
        description: "Get up close with the world's most spectacular wildlife in their natural habitats.",
        isActive: true
      },
      { 
        name: "Honeymoon", 
        slug: "honeymoon",
        icon: "💑", 
        color: "from-rose-500 to-pink-700", 
        link: "/packages?type=Honeymoon", 
        order: 5,
        shortLocationList: "Maldives · Paris · Santorini · Bali",
        description: "Romantic escapes designed for couples — private villas, candlelit dinners, and more.",
        isActive: true
      },
      { 
        name: "Family Tours", 
        slug: "family-tours",
        icon: "👨‍👩‍👧", 
        color: "from-violet-500 to-purple-700", 
        link: "/packages?type=Family", 
        order: 6,
        shortLocationList: "Singapore · Thailand · Goa · Kerala",
        description: "Child-friendly adventures that create memories the whole family will cherish forever.",
        isActive: true
      },
      { 
        name: "Relaxation & Wellness", 
        slug: "relaxation-wellness",
        icon: "🧘", 
        color: "from-teal-500 to-cyan-700", 
        link: "/packages?type=Relaxation", 
        order: 7,
        shortLocationList: "Kerala · Bali · Coorg · Thailand",
        description: "Rejuvenating retreats with yoga, Ayurveda, spa treatments, and peaceful surroundings.",
        isActive: true
      },
      { 
        name: "Religious & Spiritual", 
        slug: "religious-spiritual",
        icon: "🕌", 
        color: "from-yellow-500 to-amber-700", 
        link: "/packages?type=Religious", 
        order: 8,
        shortLocationList: "Varanasi · Tirupati · Shirdi · Amritsar",
        description: "Sacred journeys to holy sites — finding peace, purpose, and divine connection.",
        isActive: true
      },
    ];

    await db.collection("categories").deleteMany({});
    await db.collection("categories").insertMany(initialCategories);

    return NextResponse.json({ success: true, message: "Categories seeded successfully" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

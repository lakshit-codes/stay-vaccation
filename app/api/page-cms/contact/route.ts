import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";

const DEFAULT_CONTACT_DATA = {
  hero: {
    title: "Get in Touch",
    subtitle: "We're here to help you plan your next adventure",
    description: "Contact our travel experts for personalized assistance and bookings."
  },
  contactInfo: {
    address: "",
    workingHours: "Monday - Saturday: 10:00 AM - 07:00 PM",
    phone: "",
    supportText: "Speak with our destination specialists",
    email: "",
    emailText: "Drop us a line anytime",
    whatsapp: "",
    whatsappText: "Chat with us on WhatsApp"
  },
  social: {
    title: "Follow Us",
    instagram: "",
    facebook: "",
    youtube: ""
  },
  office: {
    title: "Our Office",
    address: ""
  },
  formSettings: {
    enabled: true,
    successMessage: "Thank you for contacting us! We will get back to you shortly."
  }
};

export async function GET(req: NextRequest) {
  try {
    const db = await getDatabase();
    const cmsDoc = await db.collection("page_cms").findOne({ page: "contact" });

    if (!cmsDoc) {
      return NextResponse.json({
        success: true,
        data: DEFAULT_CONTACT_DATA
      });
    }

    return NextResponse.json({
      success: true,
      data: cmsDoc.data || DEFAULT_CONTACT_DATA
    });
  } catch (err) {
    console.error("GET CONTACT CMS ERROR:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDatabase();

    // The data should contain the 'data' field from the user structure
    // We store it under { page: "contact", data: body }
    
    await db.collection("page_cms").updateOne(
      { page: "contact" },
      {
        $set: {
          data: body,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Contact page CMS saved successfully" });
  } catch (err) {
    console.error("POST CONTACT CMS ERROR:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";

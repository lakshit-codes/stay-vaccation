"use client";

import React, { useState, useEffect } from "react";
import { Card, Inp, TA, FL, Btn, Ic } from "../../../../components/AdminCore";

export default function ContactEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    hero: { title: "", subtitle: "", description: "" },
    contactInfo: {
      address: "",
      workingHours: "",
      phone: "",
      supportText: "",
      email: "",
      emailText: "",
      whatsapp: "",
      whatsappText: ""
    },
    social: { title: "", instagram: "", facebook: "", youtube: "" },
    office: { title: "", address: "" },
    formSettings: { enabled: true, successMessage: "" }
  });

  useEffect(() => {
    fetch("/api/page-cms/contact")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/page-cms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        alert("Changes saved successfully!");
      } else {
        alert("Error saving: " + result.message);
      }
    } catch (err) {
      alert("Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  const update = (section: string, field: string, val: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: val },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">Contact Page Editor</h2>
           <p className="text-gray-500 text-sm">Manage SEO, contact details, and social links</p>
        </div>
        <Btn variant="success" size="lg" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : <><Ic.Check /> Save Changes</>}
        </Btn>
      </div>

      {/* Hero Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
           <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
             <Ic.Dashboard />
           </div>
           <h3 className="font-bold text-lg text-gray-900">Hero Section</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FL>Hero Title</FL>
            <Inp value={data.hero.title} onChange={(e) => update("hero", "title", e.target.value)} placeholder="e.g. Get in Touch" />
          </div>
          <div className="md:col-span-2">
            <FL>Hero Description</FL>
            <TA value={data.hero.description} onChange={(e) => update("hero", "description", e.target.value)} placeholder="Main text shown under the title..." />
          </div>
        </div>
      </Card>

      {/* Contact Info */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
           <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
             <Ic.MapPin />
           </div>
           <h3 className="font-bold text-lg text-gray-900">Contact Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FL>Primary Address</FL>
            <Inp value={data.contactInfo.address} onChange={(e) => update("contactInfo", "address", e.target.value)} placeholder="Full office address" />
          </div>
          <div>
            <FL>Working Hours</FL>
            <Inp value={data.contactInfo.workingHours} onChange={(e) => update("contactInfo", "workingHours", e.target.value)} placeholder="e.g. Mon-Sat: 10AM - 7PM" />
          </div>
          <div>
            <FL>Phone Number</FL>
            <Inp value={data.contactInfo.phone} onChange={(e) => update("contactInfo", "phone", e.target.value)} placeholder="+91 ..." />
          </div>
          <div>
            <FL>Phone Support Text</FL>
            <Inp value={data.contactInfo.supportText} onChange={(e) => update("contactInfo", "supportText", e.target.value)} placeholder="e.g. Available 24/7" />
          </div>
          <div>
            <FL>Email Address</FL>
            <Inp value={data.contactInfo.email} onChange={(e) => update("contactInfo", "email", e.target.value)} placeholder="contact@example.com" />
          </div>
          <div>
            <FL>Email Subtext</FL>
            <Inp value={data.contactInfo.emailText} onChange={(e) => update("contactInfo", "emailText", e.target.value)} placeholder="e.g. We reply within 2 hours" />
          </div>
          <div>
            <FL>WhatsApp Number</FL>
            <Inp value={data.contactInfo.whatsapp} onChange={(e) => update("contactInfo", "whatsapp", e.target.value)} placeholder="+91 ..." />
          </div>
          <div>
            <FL>WhatsApp Text</FL>
            <Inp value={data.contactInfo.whatsappText} onChange={(e) => update("contactInfo", "whatsappText", e.target.value)} placeholder="e.g. Instant chat support" />
          </div>
        </div>
      </Card>

      {/* Social Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
           <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
             <Ic.Globe />
           </div>
           <h3 className="font-bold text-lg text-gray-900">Social Media</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FL>Section Title</FL>
            <Inp value={data.social.title} onChange={(e) => update("social", "title", e.target.value)} placeholder="e.g. Follow Our Journeys" />
          </div>
          <div>
            <FL>Instagram URL</FL>
            <Inp value={data.social.instagram} onChange={(e) => update("social", "instagram", e.target.value)} placeholder="https://instagram.com/..." />
          </div>
          <div>
            <FL>Facebook URL</FL>
            <Inp value={data.social.facebook} onChange={(e) => update("social", "facebook", e.target.value)} placeholder="https://facebook.com/..." />
          </div>
          <div>
            <FL>YouTube URL</FL>
            <Inp value={data.social.youtube} onChange={(e) => update("social", "youtube", e.target.value)} placeholder="https://youtube.com/..." />
          </div>
        </div>
      </Card>

      {/* Office Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
           <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
             <Ic.MapPin />
           </div>
           <h3 className="font-bold text-lg text-gray-900">Office Location (Map Area)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FL>Office Title</FL>
            <Inp value={data.office.title} onChange={(e) => update("office", "title", e.target.value)} placeholder="e.g. Head Office" />
          </div>
          <div className="md:col-span-2">
            <FL>Full Address</FL>
            <TA value={data.office.address} onChange={(e) => update("office", "address", e.target.value)} placeholder="Address shown in the map section..." />
          </div>
        </div>
      </Card>

      {/* Form Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
           <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
             <Ic.Booking />
           </div>
           <h3 className="font-bold text-lg text-gray-900">Lead Form Settings</h3>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
             <div>
               <p className="font-bold text-gray-900 text-sm">Enable Enquiry Form</p>
               <p className="text-xs text-gray-500">Allow users to send enquiries from the contact page</p>
             </div>
             <input 
               type="checkbox" 
               className="w-5 h-5 accent-blue-600 cursor-pointer"
               checked={data.formSettings.enabled}
               onChange={(e) => update("formSettings", "enabled", e.target.checked)}
             />
          </div>
          <div>
            <FL>Success Message</FL>
            <TA value={data.formSettings.successMessage} onChange={(e) => update("formSettings", "successMessage", e.target.value)} placeholder="Message shown after submit. Use {name} for guest name." />
          </div>
        </div>
      </Card>

      <div className="flex justify-end pt-4">
         <Btn variant="primary" size="lg" className="w-full md:w-auto" onClick={handleSave} disabled={saving}>
           {saving ? "Saving Changes..." : <><Ic.Check /> Save Changes</>}
         </Btn>
      </div>
    </div>
  );
}

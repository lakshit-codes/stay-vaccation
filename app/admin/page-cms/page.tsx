"use client";

import React from "react";
import AdminLayoutWrapper from "../../components/AdminLayoutWrapper";
import { Card, Ic, Btn } from "../../components/AdminCore";
import { useRouter } from "next/navigation";

export default function PageCmsPage() {
  const router = useRouter();

  const pages = [
    { id: "contact-page", name: "Contact Page", lastModified: "2024-04-20" },
  ];

  return (
    <AdminLayoutWrapper section="page-cms">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-8 h-8">
                    <Ic.Document />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Page Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Modified</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pages.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-4 py-3.5">
                       <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                         <Ic.Document />
                       </div>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-gray-900">{p.name}</td>
                    <td className="px-4 py-3.5 text-gray-500">{p.lastModified}</td>
                    <td className="px-4 py-3.5 text-right">
                      <Btn variant="primary" size="sm" onClick={() => router.push(`/admin/page-cms/edit/${p.id}`)}>
                        <Ic.Edit /> Edit
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Ic.Info />
          </div>
          <div>
            <h4 className="font-bold text-blue-950 text-sm">Future Roadmap</h4>
            <p className="text-blue-900/70 text-xs mt-1">
              Soon you will be able to manage Home, About, and Services pages from this central dashboard. 
              Currently, Contact Page management is being initialized.
            </p>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}

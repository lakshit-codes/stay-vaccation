import AdminLayoutWrapper from "../../../../components/AdminLayoutWrapper";
import ContactEditor from "./ContactEditor";

export const metadata = {
  title: "Edit Page Content — Admin Panel",
};

export default async function PageCmsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // We check which page we are editing. For now, only 'contact-page' is supported.
  const isContact = id === "contact-page";

  return (
    <AdminLayoutWrapper section="page-cms">
      {isContact ? (
        <ContactEditor />
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
           <h2 className="text-xl font-bold text-gray-900">Editor Not Found</h2>
           <p className="text-gray-500 mt-2">The requested page editor for "{id}" is not yet implemented.</p>
        </div>
      )}
    </AdminLayoutWrapper>
  );
}

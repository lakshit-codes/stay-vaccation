"use client";
import React, { useState, useEffect } from "react";
import { ViewPackage } from "@/app/components/AdminCore";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchPackages } from "@/app/store/features/packages/packageThunks";

export default function ViewPackageContent({ id }: { id: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { packages, loading: globalLoading } = useAppSelector(state => state.packages);
  
  const [pkg, setPkg]               = useState<any>(null);
  const [loading, setLoading]       = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const found = packages.find(p => p.id === id || (p as any)._id === id);
    if (found) {
      setPkg(found);
      setLoading(false);
    } else if (!globalLoading) {
      dispatch(fetchPackages()).then((action) => {
        if (fetchPackages.fulfilled.match(action)) {
          const freshFound = action.payload.find(p => p.id === id || (p as any)._id === id);
          if (freshFound) {
            setPkg(freshFound);
          } else {
            setFetchError("Package not found");
          }
        } else {
          setFetchError("Failed to load packages");
        }
        setLoading(false);
      });
    }
  }, [id, packages, globalLoading, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="animate-spin w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Loading package…</p>
          <p className="text-gray-400 text-xs mt-1">ID: {id}</p>
        </div>
      </div>
    );
  }

  if (fetchError || !pkg) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl font-bold">!</span>
          </div>
          <p className="text-gray-800 font-semibold">{fetchError || "Package not found"}</p>
          <p className="text-gray-400 text-xs mt-1">ID: {id}</p>
          <button onClick={() => router.push("/admin/packages")} className="mt-4 text-sm text-blue-700 underline">
            ← Back to packages
          </button>
        </div>
      </div>
    );
  }

  return (
    <ViewPackage
      pkg={pkg}
      onEdit={() => router.push(`/admin/packages/edit/${id}`)}
    />
  );
}

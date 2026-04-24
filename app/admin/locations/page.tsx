"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Ic, Btn, Badge, Modal, RegionForm, Region, DestinationForm, Destination } from "@/app/components/AdminCore";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchRegions, updateRegion, deleteRegion, createRegion } from "@/app/store/features/regions/regionThunks";
import { fetchDestinations, updateDestination, deleteDestination, createDestination } from "@/app/store/features/destinations/destinationThunks";

export default function LocationsAdminPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { regions } = useAppSelector(state => state.regions);
  const { destinations } = useAppSelector(state => state.destinations);
  
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Region CRUD State
  const [regionModalOpen, setRegionModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [regionToDelete, setRegionToDelete] = useState<Region | null>(null);

  // Destination CRUD State
  const [destModalOpen, setDestModalOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [targetRegionId, setTargetRegionId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deletingId) return;
    dispatch(deleteDestination(deletingId)).then(() => setDeletingId(null));
  };

  const handleSaveRegion = async (data: any) => {
    const isEdit = !!selectedRegion;
    const payload = isEdit ? { ...data, _id: selectedRegion!._id } : data;
    
    if (isEdit) {
      dispatch(updateRegion(payload));
    } else {
      dispatch(createRegion(payload));
    }
    setRegionModalOpen(false);
    setSelectedRegion(null);
  };

  const handleDeleteRegion = async () => {
    if (!regionToDelete) return;
    dispatch(deleteRegion(regionToDelete._id)).then(() => setRegionToDelete(null));
  };

  const handleSaveDest = async (data: any) => {
    const isEdit = !!selectedDest;
    const payload = {
      ...data,
      regionId: targetRegionId || data.regionId,
      ...(isEdit ? { _id: selectedDest!._id } : {}),
    };

    if (isEdit) {
      dispatch(updateDestination(payload as Destination));
    } else {
      dispatch(createDestination(payload));
    }
    setDestModalOpen(false);
    setSelectedDest(null);
    setTargetRegionId(null);
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Locations</h2>
          <p className="text-gray-500 mt-1">Manage travel locations and destination groupings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={async () => { await Promise.all([dispatch(fetchRegions()), dispatch(fetchDestinations())]); }}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl border border-transparent hover:border-gray-100 transition-all shadow-sm"
            title="Refresh Data"
          >
            <Ic.Sync />
          </button>
          <Btn variant="primary" onClick={() => { setSelectedRegion(null); setRegionModalOpen(true); }}>
            <Ic.Plus /> Add Custom Region
          </Btn>
        </div>
      </div>

      <div className="space-y-12">
        {regions.map((region) => {
          const regionDestinations = destinations.filter(d => d.regionId === region._id);
          return (
            <div key={region._id} className="space-y-4">
              {/* Region Header */}
              <div className="flex items-center gap-4 group/header">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-2xl shadow-lg border border-white/10`}>
                  {region.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{region.name}</h3>
                    {region.isActive === false ? (
                      <Badge className="bg-gray-100 text-gray-500 border-gray-200">Inactive</Badge>
                    ) : (
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100">Active</Badge>
                    )}
                    <div className="flex items-center gap-2 ml-2">
                      <button onClick={() => { setSelectedRegion(region); setRegionModalOpen(true); }} className="text-[10px] font-bold text-gray-400 hover:text-blue-600 uppercase tracking-widest flex items-center gap-1 transition-all">
                        <Ic.Edit /> Edit
                      </button>
                      <button onClick={() => setRegionToDelete(region)} className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-1 transition-all">
                        <Ic.Trash /> Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{regionDestinations.length} managed destinations</p>
                </div>
                <div className="h-px flex-1 bg-gray-100 ml-4" />
              </div>

              {/* Destinations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {regionDestinations.map((dest) => (
                  <Card key={dest._id} className="p-4 hover:border-blue-200 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{dest.name.split(',')[0] === "Bali" ? "🌺" : "📍"}</div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge className="bg-blue-50 text-blue-700 border-blue-100 italic">
                          {dest.packageCount || 0} Pkgs
                        </Badge>
                        <Badge className={`border-0 ${dest.isActive ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-500"}`}>
                          {dest.isActive ? "Active" : "Inactive"}
                        </Badge>
                        {dest.isTrending && (
                          <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                            🔥 Trending
                          </Badge>
                        )}
                        {dest.category && (
                          <Badge className={dest.category === "India" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-blue-50 text-blue-700 border-blue-200"}>
                            {dest.category === "India" ? "🇮🇳 India" : "🌍 Intl"}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="group/title flex items-center gap-2 cursor-pointer" onClick={() => router.push(`/admin/locations/edit/${dest._id}`)}>
                      <h4 className="font-bold text-gray-900 group-hover/title:text-blue-600 transition-colors">{dest.name}</h4>
                      <Ic.Link className="opacity-0 group-hover/title:opacity-100 text-blue-400 w-3 h-3 transition-opacity" />
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{dest.description}</p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex gap-4">
                        <button onClick={(e) => { e.stopPropagation(); setSelectedDest(dest); setTargetRegionId(dest.regionId); setDestModalOpen(true); }} className="text-[10px] font-bold text-gray-400 hover:text-blue-600 uppercase tracking-widest flex items-center gap-1 transition-colors">
                          <Ic.Edit /> Edit
                        </button>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setDeletingId(dest._id); }} className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-1 transition-colors">
                        <Ic.Trash /> Delete
                      </button>
                    </div>
                  </Card>
                ))}
                
                {/* Add Destination Placeholder */}
                <button 
                  onClick={() => { setSelectedDest(null); setTargetRegionId(region._id); setDestModalOpen(true); }}
                  className="border-2 border-dashed border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-gray-300 hover:text-blue-400"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">
                    <Ic.Plus />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Add Destination</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Uncategorized Destinations */}
        {(() => {
          const uncategorized = destinations.filter(d => !regions.some(r => r._id === d.regionId));
          if (uncategorized.length === 0) return null;
          return (
            <div className="space-y-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl shadow-sm border border-amber-100 text-amber-600">
                  <Ic.Info />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Uncategorized / Orphaned</h3>
                  <p className="text-gray-500 text-sm">{uncategorized.length} destinations pending assignment</p>
                </div>
                <div className="h-px flex-1 bg-amber-50 ml-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {uncategorized.map((dest) => (
                  <Card key={dest._id} onClick={() => { setSelectedDest(dest); setTargetRegionId(null); setDestModalOpen(true); }} className="p-4 border-amber-100 bg-amber-50/20 hover:border-amber-200 transition-all group cursor-pointer border-dashed">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">⚠️</div>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">Needs Region</Badge>
                    </div>
                    <h4 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{dest.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{dest.description}</p>
                    <div className="mt-4 pt-4 border-t border-amber-100 flex items-center justify-between">
                      <div className="flex gap-4">
                        <button onClick={(e) => { e.stopPropagation(); setSelectedDest(dest); setTargetRegionId(null); setDestModalOpen(true); }} className="text-[10px] font-bold text-amber-600 hover:text-amber-800 uppercase tracking-widest flex items-center gap-1 transition-colors">
                          <Ic.Edit /> Edit
                        </button>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setDeletingId(dest._id); }} className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-1 transition-colors">
                        <Ic.Trash /> Delete
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })()}
      </div>


      {/* Destination Edit/Create Modal */}
      <Modal open={destModalOpen} onClose={() => { setDestModalOpen(false); setSelectedDest(null); }} title={selectedDest ? "Quick Edit Destination" : "Add New Destination"}>
        {/* key forces a fresh form state when switching between add/edit or different destinations */}
        <DestinationForm key={selectedDest?._id || "new-dest"} initial={selectedDest} onSave={handleSaveDest} onCancel={() => { setDestModalOpen(false); setSelectedDest(null); }} />
      </Modal>

      {/* Region Edit/Create Modal */}
      <Modal open={regionModalOpen} onClose={() => { setRegionModalOpen(false); setSelectedRegion(null); }} title={selectedRegion ? "Edit Region" : "Add New Region"}>
        {/* key forces a fresh form state when switching between add/edit or different regions */}
        <RegionForm key={selectedRegion?._id || "new-region"} initial={selectedRegion} onSave={handleSaveRegion} onCancel={() => { setRegionModalOpen(false); setSelectedRegion(null); }} />
      </Modal>

      {/* Region Delete Confirmation */}
      <Modal open={!!regionToDelete} onClose={() => setRegionToDelete(null)} title="Delete Region">
        <div className="p-6">
          <div className="flex items-center gap-4 text-red-600 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-2xl">
              <Ic.Info />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Delete {regionToDelete?.name}?</h3>
              <p className="text-sm text-gray-500">All destinations under this region will lose their regional grouping. This action cannot be undone.</p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Btn variant="outline" onClick={() => setRegionToDelete(null)}>Cancel</Btn>
            <Btn variant="danger" onClick={handleDeleteRegion}>Delete Region Permanently</Btn>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={!!deletingId} onClose={() => setDeletingId(null)} title="Confirm Deletion">
        <div className="p-6">
          <div className="flex items-center gap-4 text-red-600 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-2xl">
              <Ic.Trash />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Are you sure?</h3>
              <p className="text-sm text-gray-500">This destination will be permanently deleted from the database. This action cannot be undone.</p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Btn variant="outline" onClick={() => setDeletingId(null)}>Cancel</Btn>
            <Btn variant="danger" onClick={handleDelete}>Yes, Delete Destination</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

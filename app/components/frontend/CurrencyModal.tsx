"use client";
import { useState, useMemo } from "react";
import { useCurrency } from "@/app/hooks/useCurrency";
import { Currency } from "@/app/store/features/currency/types";
import LucideIcon from "../LucideIcon";

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
}

export default function CurrencyModal({ isOpen, onClose, selectedCurrency, onSelectCurrency }: CurrencyModalProps) {
  const { currencies } = useCurrency();
  const [searchQuery, setSearchQuery] = useState("");

  const enabledCurrencies = useMemo(() => currencies.filter(c => c.isEnabled), [currencies]);

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return enabledCurrencies;
    const lowerQ = searchQuery.toLowerCase();
    return enabledCurrencies.filter(
      (c) =>
        c.code.toLowerCase().includes(lowerQ) ||
        c.name.toLowerCase().includes(lowerQ)
    );
  }, [searchQuery, enabledCurrencies]);

  const commonCurrencies = useMemo(() => {
     return enabledCurrencies.slice(0, 6);
  }, [enabledCurrencies]);

  if (!isOpen) return null;

  const CurrencyBtn = ({ curr }: { curr: Currency }) => {
    const isSelected = selectedCurrency.code === curr.code;
    return (
      <button
        onClick={() => {
          onSelectCurrency(curr);
          onClose();
        }}
        className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-300 border group ${
          isSelected 
            ? "bg-sky-50 border-sky-200 shadow-sm" 
            : "bg-white hover:bg-sky-50/50 border-gray-100 hover:border-sky-100 hover:-translate-y-0.5"
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${isSelected ? 'bg-white shadow-sm' : 'bg-gray-50 group-hover:bg-white group-hover:rotate-6'}`}>
            {curr.flag}
          </div>
          <div className="text-left">
            <div className={`font-['Poppins'] font-black text-[0.88rem] leading-none mb-1 ${isSelected ? "text-sky-600" : "text-[#1a1a2e]"}`}>{curr.code}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]/70">{curr.name}</div>
          </div>
        </div>
        <div className={`font-black text-[0.95rem] ${isSelected ? "text-sky-600" : "text-[#1a1a2e]/40 group-hover:text-[#1a1a2e]"}`}>
          {curr.symbol}
        </div>
      </button>
    );
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[1000] bg-[#1a1a2e]/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div
        className="fixed z-[1001] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4 animate-in zoom-in-95 fade-in slide-in-from-bottom-8 duration-500"
      >
        <div
          className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_80px_rgba(26,26,46,0.15)] border border-white overflow-hidden w-full flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-5 flex items-center justify-between">
            <div>
               <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full mb-2.5">
                  <LucideIcon name="Globe" size={10} />
                  Preferences
               </div>
               <h2 className="text-2xl font-['Poppins'] font-black text-[#1a1a2e] tracking-tight">Select Currency</h2>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 bg-gray-50 hover:bg-gray-100 text-[#1a1a2e]/30 hover:text-[#1a1a2e] hover:rotate-90"
            >
              <LucideIcon name="X" size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="px-8 pb-4">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a1a2e]/30 group-focus-within:text-sky-500 transition-colors">
                <LucideIcon name="Search" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by code or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-[0.92rem] font-bold text-[#1a1a2e] outline-none transition-all duration-300 placeholder-[#64748b]/40 bg-gray-50 border border-gray-100 focus:bg-white focus:border-sky-300 focus:shadow-[0_0_0_4px_rgba(74,144,226,0.1)]"
              />
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 px-8 pb-8 custom-scrollbar">
            {!searchQuery && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4 px-1">
                   <div className="h-[1px] flex-1 bg-gray-100"></div>
                   <h3 className="text-[10px] font-black text-[#64748b]/50 uppercase tracking-[0.2em]">Common</h3>
                   <div className="h-[1px] flex-1 bg-gray-100"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {commonCurrencies.map(c => <CurrencyBtn key={`common-${c.code}`} curr={c} />)}
                </div>
              </div>
            )}
            
            <div>
              <div className="flex items-center gap-3 mb-4 px-1">
                 <div className="h-[1px] flex-1 bg-gray-100"></div>
                 <h3 className="text-[10px] font-black text-[#64748b]/50 uppercase tracking-[0.2em]">
                    {searchQuery ? "Search Results" : "Global Options"}
                 </h3>
                 <div className="h-[1px] flex-1 bg-gray-100"></div>
              </div>
              {filteredCurrencies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredCurrencies.map(c => <CurrencyBtn key={`all-${c.code}`} curr={c} />)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-200 mb-4">
                     <LucideIcon name="SearchX" size={32} />
                  </div>
                  <p className="text-[#1a1a2e] font-black text-sm">No results found</p>
                  <p className="text-xs text-[#64748b] mt-1">We couldn't find any currency matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


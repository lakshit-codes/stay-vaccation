"use client";
import React, { useState, useRef, useEffect } from 'react';
import LucideIcon from '../components/LucideIcon';
import { useRouter } from 'next/navigation';

interface Destination {
  id: string;
  name: string;
  category?: string;
  image?: string;
}

interface SearchBarLabels {
  destination?: string;
  placeholder_destination?: string;
  checkin?: string;
  checkout?: string;
  guests?: string;
  placeholder_guests?: string;
  search_btn?: string;
}

interface SearchBarV2Props {
  destinations?: Destination[];
  labels?: SearchBarLabels;
}

const SearchBarV2: React.FC<SearchBarV2Props> = ({ destinations = [], labels = {} }) => {

  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [showGuests, setShowGuests] = useState(false);
  
  const destRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestinations(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setShowGuests(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(destination.toLowerCase())
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('location', destination);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('guests', guests.toString());
    
    router.push(`/packages?${params.toString()}`);
  };

  return (
    <div className="hero-search-v2 shadow-luxury">
      {/* Destination Field */}
      <div className="hs-field relative" ref={destRef}>
        <div className="hs-label">
          {labels.destination || 'Destination'}
        </div>
        <input 
          className="hs-input" 
          type="text" 
          placeholder={labels.placeholder_destination || 'Where to go?'}
          value={destination}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDestination(e.target.value);
            setShowDestinations(true);
          }}
          onFocus={() => setShowDestinations(true)}
        />
        
        {showDestinations && filteredDestinations.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] max-h-[350px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 shadow-luxury-lg">

            {filteredDestinations.map((dest) => (
              <button
                key={dest.id}
                className="w-full text-left px-5 py-3.5 hover:bg-sky-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
                onClick={() => {
                  setDestination(dest.name);
                  setShowDestinations(false);
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-sky-500">
                  <LucideIcon name="MapPin" size={14} />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1a1a2e]">{dest.name}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">{dest.category || 'Destination'}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Check-In Field */}
      <div className="hs-field">
        <div className="hs-label">
          {labels.checkin || 'Check-in'}
        </div>
        <input 
          className="hs-input cursor-pointer" 
          type="date" 
          value={checkIn}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckIn(e.target.value)}
        />
      </div>

      {/* Check-Out Field */}
      <div className="hs-field">
        <div className="hs-label">
          {labels.checkout || 'Check-out'}
        </div>
        <input 
          className="hs-input cursor-pointer" 
          type="date" 
          value={checkOut}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckOut(e.target.value)}
        />
      </div>

      {/* Guests Field */}
      <div className="hs-field relative" ref={guestRef}>
        <div className="hs-label">
          {labels.guests || 'Guests'}
        </div>
        <button 
          className="hs-input text-left flex items-center justify-between group"
          onClick={() => setShowGuests(!showGuests)}
        >
          <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
          <LucideIcon name="ChevronDown" size={14} className={`text-gray-300 transition-transform ${showGuests ? 'rotate-180' : ''}`} />
        </button>


        {showGuests && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-luxury-lg border border-gray-100 z-[100] p-5 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-[#1a1a2e]">Travelers</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Number of guests</div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-sky-50 hover:border-sky-200 transition-all text-[#1a1a2e]"
                >
                  <LucideIcon name="Minus" size={14} />
                </button>
                <span className="font-bold text-lg min-w-[20px] text-center">{guests}</span>
                <button 
                  onClick={() => setGuests(guests + 1)}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-sky-50 hover:border-sky-200 transition-all text-[#1a1a2e]"
                >
                  <LucideIcon name="Plus" size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Button */}
      <button 
        className="hs-btn"
        onClick={handleSearch}
      >
        <LucideIcon name="Search" size={18} />
        <span>{labels.search_btn || 'Search'}</span>
      </button>
    </div>
  );
};

export default SearchBarV2;

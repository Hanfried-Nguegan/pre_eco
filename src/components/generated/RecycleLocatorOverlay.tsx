"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, ChevronRight, Clock, Star, Package, Shirt, FileText, WineIcon as Glass, Filter, Loader2, ArrowLeft, Calendar, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
export interface CartItem {
  id: string;
  name: string;
  price: number;
  points: number;
  image: string;
  quantity: number;
}
type RecyclingType = 'PLASTIC' | 'GLASS' | 'PAPER' | 'CLOTHES';
type RecyclingCenter = {
  id: string;
  name: string;
  distance: string;
  distanceMeters: number;
  address: string;
  rating: number;
  reviewCount: number;
  acceptedMaterials: RecyclingType[];
  openNow: boolean;
  closingTime?: string;
  estimatedWaitTime?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};
export interface RecycleLocatorOverlayProps {
  cartItems?: CartItem[];
  onClose: () => void;
  onSelectCenter: (center: RecyclingCenter) => void;
  onSchedulePickup: () => void;
  onProceedToCheckout: () => void;
}

// Mock recycling centers data with enhanced details
const mockRecyclingCenters: RecyclingCenter[] = [{
  id: '1',
  name: 'EcoHub Central',
  distance: '0.3 mi',
  distanceMeters: 550,
  address: '123 Green Street, Downtown',
  rating: 4.8,
  reviewCount: 342,
  acceptedMaterials: ['PLASTIC', 'GLASS', 'PAPER', 'CLOTHES'],
  openNow: true,
  closingTime: '8:00 PM',
  estimatedWaitTime: '5 min',
  coordinates: {
    lat: 40.7489,
    lng: -73.9680
  }
}, {
  id: '2',
  name: 'Green Recycling Hub',
  distance: '0.5 mi',
  distanceMeters: 820,
  address: '456 Oak Avenue, Midtown',
  rating: 4.6,
  reviewCount: 218,
  acceptedMaterials: ['PLASTIC', 'CLOTHES'],
  openNow: true,
  closingTime: '7:00 PM',
  estimatedWaitTime: '8 min',
  coordinates: {
    lat: 40.7510,
    lng: -73.9705
  }
}, {
  id: '3',
  name: 'Urban Recycling Center',
  distance: '0.7 mi',
  distanceMeters: 1150,
  address: '789 Elm Street, Uptown',
  rating: 4.9,
  reviewCount: 521,
  acceptedMaterials: ['PLASTIC', 'GLASS', 'PAPER', 'CLOTHES'],
  openNow: true,
  closingTime: '9:00 PM',
  estimatedWaitTime: '3 min',
  coordinates: {
    lat: 40.7495,
    lng: -73.9720
  }
}, {
  id: '4',
  name: 'Eco Collection Point',
  distance: '0.8 mi',
  distanceMeters: 1280,
  address: '321 Pine Road, East Side',
  rating: 4.4,
  reviewCount: 156,
  acceptedMaterials: ['GLASS', 'PAPER'],
  openNow: false,
  closingTime: 'Opens tomorrow at 8:00 AM',
  coordinates: {
    lat: 40.7470,
    lng: -73.9655
  }
}, {
  id: '5',
  name: 'Community Recycling',
  distance: '1.1 mi',
  distanceMeters: 1760,
  address: '654 Maple Drive, West Side',
  rating: 4.7,
  reviewCount: 289,
  acceptedMaterials: ['CLOTHES', 'PAPER'],
  openNow: true,
  closingTime: '6:00 PM',
  estimatedWaitTime: '12 min',
  coordinates: {
    lat: 40.7505,
    lng: -73.9660
  }
}];
const RecyclingTypeIcon = ({
  type
}: {
  type: RecyclingType;
}) => {
  const iconMap = {
    PLASTIC: Package,
    GLASS: Glass,
    PAPER: FileText,
    CLOTHES: Shirt
  };
  const Icon = iconMap[type];
  return <Icon size={14} data-magicpath-id="0" data-magicpath-path="RecycleLocatorOverlay.tsx" />;
};
export const RecycleLocatorOverlay = ({
  cartItems = [],
  onClose,
  onSelectCenter,
  onSchedulePickup,
  onProceedToCheckout
}: RecycleLocatorOverlayProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [centers, setCenters] = useState<RecyclingCenter[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<RecyclingType | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);

  // Simulate loading nearby centers
  useEffect(() => {
    const timer = setTimeout(() => {
      setCenters(mockRecyclingCenters);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort centers
  const filteredAndSortedCenters = centers.filter(center => {
    if (selectedFilter === 'ALL') return true;
    return center.acceptedMaterials.includes(selectedFilter);
  }).sort((a, b) => {
    if (sortBy === 'distance') {
      return a.distanceMeters - b.distanceMeters;
    } else {
      return b.rating - a.rating;
    }
  });
  const handleCenterSelect = (center: RecyclingCenter) => {
    setSelectedCenter(center);
  };
  const handleGetDirections = (center: RecyclingCenter) => {
    onSelectCenter(center);
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 z-[200] bg-zinc-50 flex flex-col font-sans overflow-hidden" data-magicpath-id="1" data-magicpath-path="RecycleLocatorOverlay.tsx">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20" data-magicpath-id="2" data-magicpath-path="RecycleLocatorOverlay.tsx">
        <div className="flex items-center justify-between" data-magicpath-id="3" data-magicpath-path="RecycleLocatorOverlay.tsx">
          <button onClick={onClose} className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer" data-magicpath-id="4" data-magicpath-path="RecycleLocatorOverlay.tsx">
            <ArrowLeft size={24} className="text-zinc-800" data-magicpath-id="5" data-magicpath-path="RecycleLocatorOverlay.tsx" />
          </button>
          
          <h1 className="text-2xl font-semibold text-zinc-800" data-magicpath-id="6" data-magicpath-path="RecycleLocatorOverlay.tsx">Find Drop-Off Location</h1>
          
          <button onClick={onClose} className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer" data-magicpath-id="7" data-magicpath-path="RecycleLocatorOverlay.tsx">
            <X size={24} className="text-zinc-800" data-magicpath-id="8" data-magicpath-path="RecycleLocatorOverlay.tsx" />
          </button>
        </div>

        {/* Info Banner */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 flex items-start gap-3" data-magicpath-id="9" data-magicpath-path="RecycleLocatorOverlay.tsx">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0" data-magicpath-id="10" data-magicpath-path="RecycleLocatorOverlay.tsx">
            <Info size={20} className="text-blue-600" data-magicpath-id="11" data-magicpath-path="RecycleLocatorOverlay.tsx" />
          </div>
          <div className="flex-1" data-magicpath-id="12" data-magicpath-path="RecycleLocatorOverlay.tsx">
            <p className="text-sm font-semibold text-zinc-800 mb-1" data-magicpath-id="13" data-magicpath-path="RecycleLocatorOverlay.tsx">
              Drop off items before checkout
            </p>
            <p className="text-xs text-zinc-600" data-magicpath-id="14" data-magicpath-path="RecycleLocatorOverlay.tsx">
              Find a nearby recycling center to drop off your items, then continue with your purchase
            </p>
          </div>
        </motion.div>
      </header>

      {/* Loading State */}
      {isLoading ? <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="flex-1 flex flex-col items-center justify-center px-6" data-magicpath-id="15" data-magicpath-path="RecycleLocatorOverlay.tsx">
          <motion.div animate={{
        rotate: 360
      }} transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }} className="w-20 h-20 mb-6" data-magicpath-id="16" data-magicpath-path="RecycleLocatorOverlay.tsx">
            <Loader2 size={80} className="text-[#005C4B]" data-magicpath-id="17" data-magicpath-path="RecycleLocatorOverlay.tsx" />
          </motion.div>
          <h2 className="text-xl font-bold text-zinc-800 mb-2" data-magicpath-id="18" data-magicpath-path="RecycleLocatorOverlay.tsx">Finding nearby locations...</h2>
          <p className="text-zinc-500 text-center max-w-xs" data-magicpath-id="19" data-magicpath-path="RecycleLocatorOverlay.tsx">
            We're searching for recycling centers close to you
          </p>
        </motion.div> : <>
          {/* Filter Bar */}
          <div className="bg-white px-6 py-4 shadow-sm" data-magicpath-id="20" data-magicpath-path="RecycleLocatorOverlay.tsx">
            <div className="flex items-center gap-3 mb-3 overflow-x-auto scrollbar-hide pb-2" data-magicpath-id="21" data-magicpath-path="RecycleLocatorOverlay.tsx">
              <button onClick={() => setSelectedFilter('ALL')} className={cn("px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all", selectedFilter === 'ALL' ? "bg-[#005C4B] text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200")} data-magicpath-id="22" data-magicpath-path="RecycleLocatorOverlay.tsx">
                All Types
              </button>
              {(['PLASTIC', 'GLASS', 'PAPER', 'CLOTHES'] as RecyclingType[]).map(type => <button key={type} onClick={() => setSelectedFilter(type)} className={cn("px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2", selectedFilter === type ? "bg-[#005C4B] text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200")} data-magicpath-id="23" data-magicpath-path="RecycleLocatorOverlay.tsx">
                  <RecyclingTypeIcon type={type} data-magicpath-id="24" data-magicpath-path="RecycleLocatorOverlay.tsx" />
                  {type}
                </button>)}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2" data-magicpath-id="25" data-magicpath-path="RecycleLocatorOverlay.tsx">
              <span className="text-xs font-medium text-zinc-500 mr-2" data-magicpath-id="26" data-magicpath-path="RecycleLocatorOverlay.tsx">Sort by:</span>
              <button onClick={() => setSortBy('distance')} className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold transition-all", sortBy === 'distance' ? "bg-[#DDF247] text-[#2A1805]" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200")} data-magicpath-id="27" data-magicpath-path="RecycleLocatorOverlay.tsx">
                Distance
              </button>
              <button onClick={() => setSortBy('rating')} className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold transition-all", sortBy === 'rating' ? "bg-[#DDF247] text-[#2A1805]" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200")} data-magicpath-id="28" data-magicpath-path="RecycleLocatorOverlay.tsx">
                Rating
              </button>
              <span className="text-xs text-zinc-400 ml-auto" data-magicpath-id="29" data-magicpath-path="RecycleLocatorOverlay.tsx">
                {filteredAndSortedCenters.length} locations found
              </span>
            </div>
          </div>

          {/* Centers List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 pb-32" data-magicpath-id="30" data-magicpath-path="RecycleLocatorOverlay.tsx">
            <AnimatePresence mode="popLayout" data-magicpath-id="31" data-magicpath-path="RecycleLocatorOverlay.tsx">
              {filteredAndSortedCenters.map((center, index) => <motion.div key={center.id} layout initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            scale: 0.95
          }} transition={{
            delay: index * 0.05
          }} className={cn("bg-white rounded-[2rem] p-5 shadow-sm mb-4 cursor-pointer transition-all hover:shadow-md", selectedCenter?.id === center.id && "ring-2 ring-[#005C4B]")} onClick={() => handleCenterSelect(center)} data-magicpath-id="32" data-magicpath-path="RecycleLocatorOverlay.tsx">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4" data-magicpath-id="33" data-magicpath-path="RecycleLocatorOverlay.tsx">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0" data-magicpath-id="34" data-magicpath-path="RecycleLocatorOverlay.tsx">
                      <MapPin className="text-purple-600" size={24} data-magicpath-id="35" data-magicpath-path="RecycleLocatorOverlay.tsx" />
                    </div>
                    <div className="flex-1 min-w-0" data-magicpath-id="36" data-magicpath-path="RecycleLocatorOverlay.tsx">
                      <h3 className="text-lg font-bold text-zinc-800 mb-1 line-clamp-1" data-magicpath-id="37" data-magicpath-path="RecycleLocatorOverlay.tsx">
                        {center.name}
                      </h3>
                      <p className="text-sm text-zinc-500 mb-2 line-clamp-1" data-magicpath-id="38" data-magicpath-path="RecycleLocatorOverlay.tsx">
                        {center.address}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap" data-magicpath-id="39" data-magicpath-path="RecycleLocatorOverlay.tsx">
                        <div className="flex items-center gap-1" data-magicpath-id="40" data-magicpath-path="RecycleLocatorOverlay.tsx">
                          <Navigation size={14} className="text-[#005C4B]" data-magicpath-id="41" data-magicpath-path="RecycleLocatorOverlay.tsx" />
                          <span className="text-xs font-semibold text-[#005C4B]" data-magicpath-id="42" data-magicpath-path="RecycleLocatorOverlay.tsx">
                            {center.distance}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-[#DDF247] px-2 py-0.5 rounded-full" data-magicpath-id="43" data-magicpath-path="RecycleLocatorOverlay.tsx">
                          <Star size={12} className="text-[#2A1805] fill-[#2A1805]" data-magicpath-id="44" data-magicpath-path="RecycleLocatorOverlay.tsx" />
                          <span className="text-xs font-bold text-[#2A1805]" data-magicpath-id="45" data-magicpath-path="RecycleLocatorOverlay.tsx">
                            {center.rating}
                          </span>
                          <span className="text-xs text-[#2A1805]/60" data-magicpath-id="46" data-magicpath-path="RecycleLocatorOverlay.tsx">
                            ({center.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status & Wait Time */}
                  <div className="flex items-center gap-2 mb-4" data-magicpath-id="47" data-magicpath-path="RecycleLocatorOverlay.tsx">
                    {center.openNow ? <>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-xl" data-magicpath-id="48" data-magicpath-path="RecycleLocatorOverlay.tsx">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" data-magicpath-id="49" data-magicpath-path="RecycleLocatorOverlay.tsx" />
                          <span className="text-xs font-semibold text-green-700" data-magicpath-id="50" data-magicpath-path="RecycleLocatorOverlay.tsx">Open Now</span>
                          <Clock size={12} className="text-green-600 ml-1" data-magicpath-id="51" data-magicpath-path="RecycleLocatorOverlay.tsx" />
                          <span className="text-xs text-green-600" data-magicpath-id="52" data-magicpath-path="RecycleLocatorOverlay.tsx">until {center.closingTime}</span>
                        </div>
                        {center.estimatedWaitTime && <div className="px-3 py-1.5 bg-blue-50 rounded-xl" data-magicpath-id="53" data-magicpath-path="RecycleLocatorOverlay.tsx">
                            <span className="text-xs font-semibold text-blue-700" data-magicpath-id="54" data-magicpath-path="RecycleLocatorOverlay.tsx">
                              ~{center.estimatedWaitTime} wait
                            </span>
                          </div>}
                      </> : <div className="px-3 py-1.5 bg-red-50 rounded-xl" data-magicpath-id="55" data-magicpath-path="RecycleLocatorOverlay.tsx">
                        <span className="text-xs font-semibold text-red-700" data-magicpath-id="56" data-magicpath-path="RecycleLocatorOverlay.tsx">
                          Closed • {center.closingTime}
                        </span>
                      </div>}
                  </div>

                  {/* Accepted Materials */}
                  <div className="mb-4" data-magicpath-id="57" data-magicpath-path="RecycleLocatorOverlay.tsx">
                    <p className="text-xs font-semibold text-zinc-500 mb-2" data-magicpath-id="58" data-magicpath-path="RecycleLocatorOverlay.tsx">Accepts:</p>
                    <div className="flex gap-2 flex-wrap" data-magicpath-id="59" data-magicpath-path="RecycleLocatorOverlay.tsx">
                      {center.acceptedMaterials.map(material => <span key={material} className="px-3 py-1 bg-[#DDF247]/30 text-[#005C4B] text-xs font-semibold rounded-full flex items-center gap-1" data-magicpath-id="60" data-magicpath-path="RecycleLocatorOverlay.tsx">
                          <RecyclingTypeIcon type={material} data-magicpath-id="61" data-magicpath-path="RecycleLocatorOverlay.tsx" />
                          {material}
                        </span>)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2" data-magicpath-id="62" data-magicpath-path="RecycleLocatorOverlay.tsx">
                    <motion.button onClick={e => {
                e.stopPropagation();
                handleGetDirections(center);
              }} whileTap={{
                scale: 0.95
              }} disabled={!center.openNow} className={cn("flex-1 py-3 px-4 rounded-[1.5rem] font-semibold text-sm flex items-center justify-center gap-2 transition-all", center.openNow ? "bg-[#2A1805] text-white hover:bg-[#1a1005]" : "bg-zinc-200 text-zinc-400 cursor-not-allowed")} data-magicpath-id="63" data-magicpath-path="RecycleLocatorOverlay.tsx">
                      <Navigation size={18} data-magicpath-id="64" data-magicpath-path="RecycleLocatorOverlay.tsx" />
                      Get Directions
                    </motion.button>
                    <motion.button whileTap={{
                scale: 0.95
              }} className="px-4 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-[1.5rem] transition-all" onClick={e => {
                e.stopPropagation();
                setSelectedCenter(center);
              }} data-magicpath-id="65" data-magicpath-path="RecycleLocatorOverlay.tsx">
                      <ChevronRight size={20} className="text-zinc-600" data-magicpath-id="66" data-magicpath-path="RecycleLocatorOverlay.tsx" />
                    </motion.button>
                  </div>
                </motion.div>)}
            </AnimatePresence>

            {filteredAndSortedCenters.length === 0 && <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} className="flex flex-col items-center justify-center py-16" data-magicpath-id="67" data-magicpath-path="RecycleLocatorOverlay.tsx">
                <div className="w-32 h-32 bg-zinc-100 rounded-full flex items-center justify-center mb-4" data-magicpath-id="68" data-magicpath-path="RecycleLocatorOverlay.tsx">
                  <MapPin size={48} className="text-zinc-400" data-magicpath-id="69" data-magicpath-path="RecycleLocatorOverlay.tsx" />
                </div>
                <h3 className="text-xl font-bold text-zinc-800 mb-2" data-magicpath-id="70" data-magicpath-path="RecycleLocatorOverlay.tsx">No locations found</h3>
                <p className="text-zinc-500 text-center max-w-xs mb-6" data-magicpath-id="71" data-magicpath-path="RecycleLocatorOverlay.tsx">
                  Try adjusting your filters or search in a different area
                </p>
                <button onClick={() => setSelectedFilter('ALL')} className="px-6 py-3 bg-[#005C4B] text-white rounded-xl font-semibold hover:bg-[#004a3d] transition-colors" data-magicpath-id="72" data-magicpath-path="RecycleLocatorOverlay.tsx">
                  Clear Filters
                </button>
              </motion.div>}
          </div>

          {/* Bottom Action Bar */}
          <motion.div initial={{
        y: 100,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.3,
        type: "spring",
        stiffness: 200
      }} className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-6 py-6 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]" data-magicpath-id="73" data-magicpath-path="RecycleLocatorOverlay.tsx">
            <div className="flex gap-3" data-magicpath-id="74" data-magicpath-path="RecycleLocatorOverlay.tsx">
              <motion.button onClick={onSchedulePickup} whileTap={{
            scale: 0.95
          }} className="flex-1 py-4 bg-[#005C4B] text-white rounded-[1.5rem] font-semibold text-base hover:bg-[#004a3d] transition-all flex items-center justify-center gap-2" data-magicpath-id="75" data-magicpath-path="RecycleLocatorOverlay.tsx">
                <Calendar size={20} data-magicpath-id="76" data-magicpath-path="RecycleLocatorOverlay.tsx" />
                Schedule Pickup
              </motion.button>
              <motion.button onClick={onProceedToCheckout} whileTap={{
            scale: 0.95
          }} className="flex-1 py-4 bg-[#2A1805] text-white rounded-[1.5rem] font-semibold text-base hover:bg-[#1a1005] transition-all flex items-center justify-center gap-2" data-magicpath-id="77" data-magicpath-path="RecycleLocatorOverlay.tsx">
                Skip & Checkout
                <ChevronRight size={20} data-magicpath-id="78" data-magicpath-path="RecycleLocatorOverlay.tsx" />
              </motion.button>
            </div>
            <p className="text-xs text-zinc-500 text-center mt-3" data-magicpath-id="79" data-magicpath-path="RecycleLocatorOverlay.tsx">
              Or pick a location above to get directions
            </p>
          </motion.div>
        </>}
    </motion.div>;
};
export default RecycleLocatorOverlay;
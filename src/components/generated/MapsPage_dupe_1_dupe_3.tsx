"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, MapPin, ScanLine, ShoppingBag, User, Search, SlidersHorizontal, Navigation, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { RecyclingCenterDetailModal } from './RecyclingCenterDetailModal';
import { NavigationWaypoint } from './NavigationWaypoint';
type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
};
type RecyclingType = 'PLASTIC' | 'GLASS' | 'PAPER' | 'CLOTHES';
type MarkerData = {
  id: string;
  name: string;
  distance: string;
  lat: number;
  lng: number;
  type: RecyclingType[];
};
const navItems: NavItem[] = [{
  id: 'home',
  label: 'HOME',
  icon: Home
}, {
  id: 'map',
  label: 'MAP',
  icon: MapPin
}, {
  id: 'scan',
  label: 'SCAN',
  icon: ScanLine
}, {
  id: 'shop',
  label: 'SHOP',
  icon: ShoppingBag
}, {
  id: 'profile',
  label: 'PROFILE',
  icon: User
}];
const recyclingFilters: RecyclingType[] = ['PLASTIC', 'GLASS', 'PAPER', 'CLOTHES'];

// Mock recycling center data
const recyclingCenters: MarkerData[] = [{
  id: '1',
  name: 'Receiving recyclables',
  distance: '550m',
  lat: 40.7489,
  lng: -73.9680,
  type: ['PLASTIC', 'GLASS', 'PAPER']
}, {
  id: '2',
  name: 'Green Recycling Hub',
  distance: '820m',
  lat: 40.7510,
  lng: -73.9705,
  type: ['PLASTIC', 'CLOTHES']
}, {
  id: '3',
  name: 'Eco Collection Point',
  distance: '1.2km',
  lat: 40.7470,
  lng: -73.9655,
  type: ['GLASS', 'PAPER']
}, {
  id: '4',
  name: 'Urban Recycling Center',
  distance: '650m',
  lat: 40.7495,
  lng: -73.9720,
  type: ['PLASTIC', 'GLASS', 'PAPER', 'CLOTHES']
}, {
  id: '5',
  name: 'Community Recycling',
  distance: '900m',
  lat: 40.7505,
  lng: -73.9660,
  type: ['CLOTHES', 'PAPER']
}, {
  id: '6',
  name: 'City Waste Management',
  distance: '1.5km',
  lat: 40.7520,
  lng: -73.9690,
  type: ['PLASTIC', 'GLASS']
}];
export const MapsPage = ({
  onNavigateToHome,
  onNavigateToShop
}: {
  onNavigateToHome?: () => void;
  onNavigateToShop?: () => void;
} = {}) => {
  const [activeTab, setActiveTab] = useState('map');
  const [activeFilters, setActiveFilters] = useState<RecyclingType[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationDestination, setNavigationDestination] = useState<MarkerData | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const toggleFilter = (filter: RecyclingType) => {
    setActiveFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
  };

  // Filter markers based on active filters
  const filteredMarkers = activeFilters.length === 0 ? recyclingCenters : recyclingCenters.filter(center => center.type.some(type => activeFilters.includes(type)));
  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
  };
  const handleStartNavigation = (destination: MarkerData) => {
    setNavigationDestination(destination);
    setIsNavigating(true);
    setSelectedMarker(null);
    setIsDetailModalOpen(false);
  };
  const handleCloseNavigation = () => {
    setIsNavigating(false);
    setNavigationDestination(null);
  };

  // If navigating, show NavigationWaypoint component
  if (isNavigating && navigationDestination) {
    return <NavigationWaypoint destination={navigationDestination} onClose={handleCloseNavigation} data-magicpath-id="0" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />;
  }
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden" data-magicpath-id="1" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
      {/* Map Container */}
      <div className="relative flex-1 w-full h-full" data-magicpath-id="2" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
        {/* Simple SVG Map Background */}
        <div ref={mapRef} className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 overflow-hidden" data-magicpath-id="3" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
          {/* Map Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" data-magicpath-id="4" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
            <defs data-magicpath-id="5" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse" data-magicpath-id="6" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#005C4B" strokeWidth="0.5" data-magicpath-id="7" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" data-magicpath-id="8" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
          </svg>

          {/* Decorative Map Roads */}
          <svg className="absolute inset-0 w-full h-full" data-magicpath-id="9" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
            <path d="M 0 200 Q 200 180 400 200 T 800 200" stroke="#9ca3af" strokeWidth="8" fill="none" opacity="0.3" data-magicpath-id="10" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
            <path d="M 200 0 Q 220 200 240 400 T 200 800" stroke="#9ca3af" strokeWidth="8" fill="none" opacity="0.3" data-magicpath-id="11" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
            <path d="M 100 100 L 700 500" stroke="#9ca3af" strokeWidth="6" fill="none" opacity="0.2" data-magicpath-id="12" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
            <path d="M 600 100 Q 400 300 300 600" stroke="#9ca3af" strokeWidth="6" fill="none" opacity="0.2" data-magicpath-id="13" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
          </svg>

          {/* Markers */}
          {filteredMarkers.map((marker, index) => {
          // Random positioning for scattered effect
          const randomX = 15 + Math.random() * 70;
          const randomY = 15 + Math.random() * 70;
          return <motion.button key={marker.id} initial={{
            scale: 0,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} exit={{
            scale: 0,
            opacity: 0
          }} transition={{
            delay: index * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 20
          }} onClick={() => handleMarkerClick(marker)} className="absolute cursor-pointer hover:z-10 group" style={{
            left: `${randomX}%`,
            top: `${randomY}%`,
            transform: 'translate(-50%, -50%)'
          }} data-magicpath-id="14" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                {/* Pulse animation */}
                <motion.div className="absolute inset-0 rounded-full bg-purple-400 pointer-events-none" initial={false} animate={{
              scale: [1, 2, 1],
              opacity: [0.7, 0, 0.7]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }} style={{
              width: '48px',
              height: '48px',
              left: '-12px',
              top: '-12px'
            }} data-magicpath-id="15" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
                
                {/* Marker Pin */}
                <div className="relative" data-magicpath-id="16" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                  <svg width="24" height="32" viewBox="0 0 24 32" className="drop-shadow-lg" data-magicpath-id="17" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                    <path d="M12 0C5.4 0 0 5.4 0 12c0 8 12 20 12 20s12-12 12-20c0-6.6-5.4-12-12-12z" fill="#8b5cf6" className="group-hover:fill-[#005C4B] transition-colors duration-200" data-magicpath-id="18" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
                    <circle cx="12" cy="12" r="6" fill="white" data-magicpath-id="19" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
                    <circle cx="12" cy="12" r="3" fill="#8b5cf6" className="group-hover:fill-[#005C4B] transition-colors duration-200" data-magicpath-id="20" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
                  </svg>
                  
                  {/* Badge for number of types */}
                  <div className="absolute -top-2 -right-2 bg-[#DDF247] text-[#2A1805] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md" data-magicpath-id="21" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                  </div>
                </div>
              </motion.button>;
        })}
        </div>

        {/* Search Bar */}
        <div className="absolute top-6 left-6 right-6 z-20" data-magicpath-id="22" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
          <div className="bg-white rounded-[2rem] shadow-lg flex items-center px-5 py-4 gap-3 max-w-2xl mx-auto" data-magicpath-id="23" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
            <Search className="text-zinc-400" size={20} data-magicpath-id="24" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
            <input type="text" placeholder="Enter recycle center or bins" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="flex-1 bg-transparent outline-none text-zinc-800 placeholder:text-zinc-400 text-sm" data-magicpath-id="25" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
            <button className="p-2 hover:bg-zinc-100 rounded-xl transition-colors" data-magicpath-id="26" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
              <SlidersHorizontal className="text-zinc-600" size={20} data-magicpath-id="27" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="absolute top-24 left-6 right-6 z-20" data-magicpath-id="28" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-2xl mx-auto pb-2" data-magicpath-id="29" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
            {recyclingFilters.map(filter => {
            const isActive = activeFilters.includes(filter);
            return <motion.button key={filter} onClick={() => toggleFilter(filter)} className={cn("px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-md", isActive ? "bg-[#005C4B] text-white" : "bg-white text-zinc-700 hover:bg-zinc-50")} whileTap={{
              scale: 0.95
            }} data-magicpath-id="30" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                  {filter}
                </motion.button>;
          })}
          </div>
        </div>

        {/* Selected Marker Info Card */}
        <AnimatePresence data-magicpath-id="31" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
          {selectedMarker && <motion.div initial={{
          y: 100,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} exit={{
          y: 100,
          opacity: 0
        }} transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }} className="absolute bottom-32 left-6 right-6 z-30 max-w-md mx-auto" data-magicpath-id="32" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl" data-magicpath-id="33" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                {/* Close button */}
                <button onClick={() => setSelectedMarker(null)} className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors" data-magicpath-id="34" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-600" data-magicpath-id="35" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                    <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-magicpath-id="36" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
                  </svg>
                </button>

                {/* Location Icon */}
                <div className="flex items-start gap-4 mb-4" data-magicpath-id="37" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0" data-magicpath-id="38" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                    <MapPin className="text-purple-600" size={24} data-magicpath-id="39" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
                  </div>
                  <div className="flex-1" data-magicpath-id="40" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                    <h3 className="text-lg font-semibold text-zinc-800 mb-1" data-magicpath-id="41" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                      {selectedMarker.name}
                    </h3>
                    <p className="text-sm text-zinc-500 flex items-center gap-1" data-magicpath-id="42" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                      <Navigation size={14} data-magicpath-id="43" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
                      {selectedMarker.distance} from you
                    </p>
                  </div>
                </div>

                {/* Recycling Types */}
                <div className="flex gap-2 flex-wrap mb-4" data-magicpath-id="44" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                  {selectedMarker.type.map(type => <span key={type} className="px-3 py-1 bg-[#DDF247]/30 text-[#005C4B] text-xs font-semibold rounded-full" data-magicpath-id="45" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                      {type}
                    </span>)}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3" data-magicpath-id="46" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                  <button onClick={() => setIsDetailModalOpen(true)} className="flex-1 py-3 px-4 bg-zinc-100 text-zinc-700 rounded-[1.5rem] font-semibold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2" data-magicpath-id="47" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                    <Info size={18} data-magicpath-id="48" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
                    More info
                  </button>
                  <button onClick={() => handleStartNavigation(selectedMarker)} className="flex-1 py-3 px-4 bg-[#2A1805] text-white rounded-[1.5rem] font-semibold text-sm hover:bg-[#1a1005] transition-colors flex items-center justify-center gap-2" data-magicpath-id="49" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                    <Navigation size={18} data-magicpath-id="50" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
                    Get Direction
                  </button>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>

      {/* Floating Bottom Navbar Container */}
      <div className="absolute bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none" data-magicpath-id="51" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
        <nav className="bg-white p-2.5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 pointer-events-auto max-w-md w-full justify-between" data-magicpath-id="52" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
          {navItems.map(item => {
          const isActive = activeTab === item.id;
          return <motion.button key={item.id} onClick={() => {
            setActiveTab(item.id);
            if (item.id === 'home' && onNavigateToHome) {
              onNavigateToHome();
            }
            if (item.id === 'shop' && onNavigateToShop) {
              onNavigateToShop();
            }
          }} className={cn("relative flex items-center justify-center rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer -webkit-tap-highlight-color-transparent outline-none", isActive ? "flex-grow px-6 py-3 bg-[#2A1805]" : "w-12 h-12 hover:bg-zinc-100")} layout transition={{
            type: "spring",
            stiffness: 500,
            damping: 35
          }} data-magicpath-id="53" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                {/* Active State Content */}
                <AnimatePresence mode="wait" data-magicpath-id="54" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                  {isActive && <motion.div className="flex items-center gap-3 overflow-hidden whitespace-nowrap" initial={{
                opacity: 0,
                width: 0
              }} animate={{
                opacity: 1,
                width: "auto"
              }} exit={{
                opacity: 0,
                width: 0
              }} transition={{
                duration: 0.3,
                delay: 0.1
              }} data-magicpath-id="55" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                      <item.icon size={20} className="text-white shrink-0" strokeWidth={2.5} data-magicpath-id="56" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
                      <motion.span className="text-white font-semibold text-sm tracking-wide" initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.15
                }} data-magicpath-id="57" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                        {item.label}
                      </motion.span>
                    </motion.div>}
                </AnimatePresence>

                {/* Inactive State Icon */}
                {!isActive && <motion.div layoutId={`icon-${item.id}`} initial={{
              opacity: 0,
              scale: 0.5
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0
            }} transition={{
              duration: 0.2
            }} data-magicpath-id="58" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx">
                    <item.icon size={24} className="text-zinc-400" strokeWidth={2} data-magicpath-id="59" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />
                  </motion.div>}
              </motion.button>;
        })}
        </nav>
      </div>

      {/* Detail Modal */}
      {selectedMarker && <RecyclingCenterDetailModal markerData={selectedMarker} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} onStartNavigation={handleStartNavigation} data-magicpath-id="60" data-magicpath-path="MapsPage_dupe_1_dupe_3.tsx" />}
    </div>;
};
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, MapPin, ScanLine, ShoppingBag, User, Plus, TrendingUp, Package, DollarSign, Leaf, ChevronLeft, Filter, Search, Edit, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
};
export type ResaleItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  condition: 'Like New' | 'Good' | 'Fair';
  imageUrl: string;
  status: 'active' | 'sold' | 'pending';
  listedDate: string;
  views: number;
  co2Saved: number;
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

// Mock resale listings
const mockResaleItems: ResaleItem[] = [{
  id: '1',
  name: 'Vintage Leather Jacket',
  description: 'Classic brown leather jacket, gently used',
  category: 'Clothing',
  price: 89.99,
  originalPrice: 249.99,
  condition: 'Good',
  imageUrl: 'https://picsum.photos/seed/jacket1/400/400',
  status: 'active',
  listedDate: '2024-01-10',
  views: 45,
  co2Saved: 15200
}, {
  id: '2',
  name: 'iPhone 12 Pro',
  description: '128GB, Space Gray, excellent condition with box',
  category: 'Electronics',
  price: 549.00,
  originalPrice: 999.00,
  condition: 'Like New',
  imageUrl: 'https://picsum.photos/seed/phone1/400/400',
  status: 'active',
  listedDate: '2024-01-12',
  views: 128,
  co2Saved: 45800
}, {
  id: '3',
  name: 'Mid-Century Desk Chair',
  description: 'Restored oak chair with original cushion',
  category: 'Furniture',
  price: 120.00,
  originalPrice: 350.00,
  condition: 'Good',
  imageUrl: 'https://picsum.photos/seed/chair1/400/400',
  status: 'sold',
  listedDate: '2024-01-05',
  views: 89,
  co2Saved: 28500
}, {
  id: '4',
  name: 'Nike Running Shoes',
  description: 'Size 10, barely worn, original box included',
  category: 'Footwear',
  price: 65.00,
  originalPrice: 140.00,
  condition: 'Like New',
  imageUrl: 'https://picsum.photos/seed/shoes1/400/400',
  status: 'active',
  listedDate: '2024-01-14',
  views: 67,
  co2Saved: 8900
}, {
  id: '5',
  name: 'Acoustic Guitar',
  description: 'Yamaha FG800, great for beginners',
  category: 'Musical',
  price: 185.00,
  originalPrice: 350.00,
  condition: 'Good',
  imageUrl: 'https://picsum.photos/seed/guitar1/400/400',
  status: 'pending',
  listedDate: '2024-01-08',
  views: 54,
  co2Saved: 19600
}, {
  id: '6',
  name: 'Dyson Vacuum V11',
  description: 'Cordless, with all attachments',
  category: 'Appliances',
  price: 299.00,
  originalPrice: 599.00,
  condition: 'Like New',
  imageUrl: 'https://picsum.photos/seed/vacuum1/400/400',
  status: 'active',
  listedDate: '2024-01-15',
  views: 92,
  co2Saved: 35400
}];
export const SellersPage = ({
  onNavigateToHome,
  onNavigateToUpload
}: {
  onNavigateToHome?: () => void;
  onNavigateToUpload?: () => void;
} = {}) => {
  const [activeTab, setActiveTab] = useState('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'sold' | 'pending'>('all');

  // Calculate stats
  const activeListings = mockResaleItems.filter(item => item.status === 'active').length;
  const soldListings = mockResaleItems.filter(item => item.status === 'sold');
  const totalRevenue = soldListings.reduce((sum, item) => sum + item.price, 0);
  const totalCO2Saved = mockResaleItems.reduce((sum, item) => sum + item.co2Saved, 0);
  const totalViews = mockResaleItems.reduce((sum, item) => sum + item.views, 0);

  // Filter items
  const filteredItems = mockResaleItems.filter(item => {
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'sold':
        return 'bg-zinc-400 text-white';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Like New':
        return 'bg-[#DDF247] text-[#2A1805]';
      case 'Good':
        return 'bg-[#005C4B] text-white';
      case 'Fair':
        return 'bg-zinc-300 text-zinc-700';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onNavigateToHome} className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer">
            <ChevronLeft size={24} className="text-zinc-800" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-zinc-800">My Shop</h1>
            <p className="text-sm text-zinc-500 mt-0.5">Manage your resale listings</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-zinc-100 rounded-[2rem] flex items-center px-5 py-3 gap-3">
          <Search className="text-zinc-400" size={20} />
          <input type="text" placeholder="Search your listings..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="flex-1 bg-transparent outline-none text-zinc-800 placeholder:text-zinc-400 text-sm" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-32 px-6">
        {/* Stats Dashboard */}
        <div className="pt-6 space-y-4 mb-6">
          {/* Revenue & Listings Card */}
          <div className="bg-gradient-to-br from-[#DDF247] to-[#B8E635] rounded-[2.5rem] p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm font-medium text-[#2A1805]/70 mb-2">Total Revenue</p>
                  <p className="text-4xl font-bold text-[#2A1805]">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="w-14 h-14 bg-[#005C4B] rounded-2xl flex items-center justify-center">
                  <DollarSign size={28} className="text-[#DDF247]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-xs font-medium text-[#2A1805]/70 mb-1">Active</p>
                  <p className="text-2xl font-bold text-[#2A1805]">{activeListings}</p>
                </div>
                <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-xs font-medium text-[#2A1805]/70 mb-1">Sold</p>
                  <p className="text-2xl font-bold text-[#2A1805]">{soldListings.length}</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full" />
          </div>

          {/* Impact Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="bg-gradient-to-br from-[#005C4B] to-[#004a3d] rounded-[2rem] p-5 relative overflow-hidden">
              <Leaf size={24} className="text-[#DDF247] mb-3" />
              <p className="text-sm font-medium text-white/70 mb-1">CO₂ Saved</p>
              <p className="text-2xl font-bold text-white">{(totalCO2Saved / 1000).toFixed(1)}kg</p>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full" />
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-[2rem] p-5 relative overflow-hidden">
              <TrendingUp size={24} className="text-white mb-3" />
              <p className="text-sm font-medium text-white/80 mb-1">Total Views</p>
              <p className="text-2xl font-bold text-white">{totalViews}</p>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-4">
          {(['all', 'active', 'sold', 'pending'] as const).map(status => {
          const isActive = selectedStatus === status;
          const count = status === 'all' ? mockResaleItems.length : mockResaleItems.filter(item => item.status === status).length;
          return <motion.button key={status} onClick={() => setSelectedStatus(status)} className={cn("px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm", isActive ? "bg-[#005C4B] text-white" : "bg-white text-zinc-700 hover:bg-zinc-50")} whileTap={{
            scale: 0.95
          }}>
                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
              </motion.button>;
        })}
        </div>

        {/* Listings Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-800">Your Listings</h2>
          <button className="text-sm text-[#005C4B] font-semibold flex items-center gap-2 hover:underline">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Listings Grid */}
        <div className="space-y-4 pb-6">
          {filteredItems.map((item, index) => <motion.div key={item.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 bg-zinc-200">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  {/* Status Badge */}
                  <div className={cn("absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold capitalize", getStatusColor(item.status))}>
                    {item.status}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-zinc-800 text-base leading-tight line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex gap-1">
                      <button className="p-2 hover:bg-zinc-100 rounded-xl transition-colors">
                        <Edit size={16} className="text-zinc-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 mb-2 line-clamp-1">
                    {item.description}
                  </p>

                  {/* Price & Condition */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-[#005C4B]">
                      ${item.price}
                    </span>
                    <span className="text-xs text-zinc-400 line-through">
                      ${item.originalPrice}
                    </span>
                    <span className={cn("ml-auto px-2 py-1 rounded-full text-xs font-bold", getConditionColor(item.condition))}>
                      {item.condition}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <TrendingUp size={12} />
                      {item.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Leaf size={12} className="text-green-600" />
                      {(item.co2Saved / 1000).toFixed(1)}kg CO₂
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>)}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-zinc-200 rounded-full flex items-center justify-center mb-6">
              <Package size={48} className="text-zinc-400" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-800 mb-2">
              No listings found
            </h3>
            <p className="text-zinc-500 text-center px-8 mb-6">
              Try adjusting your filters or create a new listing
            </p>
            <button onClick={onNavigateToUpload} className="px-6 py-3 bg-[#DDF247] text-[#2A1805] rounded-[2rem] font-semibold hover:shadow-md transition-all">
              Create Listing
            </button>
          </motion.div>}
      </div>

      {/* Floating Add Button */}
      <motion.button onClick={onNavigateToUpload} className="absolute bottom-32 right-6 w-16 h-16 bg-gradient-to-r from-[#DDF247] to-[#B8E635] rounded-full shadow-xl flex items-center justify-center cursor-pointer z-40" whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }} initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      type: 'spring',
      stiffness: 300,
      damping: 20
    }}>
        <Plus size={32} className="text-[#2A1805]" strokeWidth={3} />
      </motion.button>

      {/* Floating Bottom Navbar */}
      <div className="absolute bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none">
        <nav className="bg-white p-2.5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 pointer-events-auto max-w-md w-full justify-between">
          {navItems.map(item => {
          const isActive = activeTab === item.id;
          return <motion.button key={item.id} onClick={() => {
            setActiveTab(item.id);
            if (item.id === 'home' && onNavigateToHome) {
              onNavigateToHome();
            }
          }} className={cn("relative flex items-center justify-center rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer -webkit-tap-highlight-color-transparent outline-none", isActive ? "flex-grow px-6 py-3 bg-[#2A1805]" : "w-12 h-12 hover:bg-zinc-100")} layout transition={{
            type: "spring",
            stiffness: 500,
            damping: 35
          }}>
                <AnimatePresence mode="wait">
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
              }}>
                      <item.icon size={20} className="text-white shrink-0" strokeWidth={2.5} />
                      <motion.span className="text-white font-semibold text-sm tracking-wide" initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.15
                }}>
                        {item.label}
                      </motion.span>
                    </motion.div>}
                </AnimatePresence>

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
            }}>
                    <item.icon size={24} className="text-zinc-400" strokeWidth={2} />
                  </motion.div>}
              </motion.button>;
        })}
        </nav>
      </div>
    </div>;
};